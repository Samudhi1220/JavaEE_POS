package lk.ijse.BackEnd.servlet;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObjectBuilder;
import lk.ijse.BackEnd.servlet.bo.BOFactory;
import lk.ijse.BackEnd.servlet.bo.CustomerBO;
import lk.ijse.BackEnd.servlet.dto.CustomerDTO;
import lk.ijse.BackEnd.servlet.util.ConnectionPoolUtil;
import lk.ijse.BackEnd.servlet.util.ResponseUtil;
import org.apache.commons.dbcp2.BasicDataSource;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(urlPatterns = "/customer")
public class CustomerServlet extends HttpServlet {
    CustomerBO customerBO = (CustomerBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.CUSTOMER);


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try (Connection connection = ConnectionPoolUtil.pool(req).getConnection();) {
            ArrayList<CustomerDTO> customers = customerBO.getAllCustomers(connection);
            JsonArrayBuilder allCustomers = Json.createArrayBuilder();
            for (CustomerDTO dto : customers) {
                JsonObjectBuilder builder = Json.createObjectBuilder();
                builder.add("cusId", dto.getId());
                builder.add("cusFirstName", dto.getFirstName());
                builder.add("cusLastName", dto.getLastName());
                builder.add("cusAddress", dto.getAddress());
                builder.add("cusSalary", dto.getSalary());
                allCustomers.add(builder.build());
                System.out.println(dto.getId());
            }

            //create the response Object
//            resp.getWriter().print(ResponseUtil.genJson("Success", "Loaded", allCustomers.build()));
            ResponseUtil.genJson("Success", 200, resp, allCustomers);

        } catch (SQLException e) {
            resp.setStatus(500);
//            resp.getWriter().print(ResponseUtil.genJson("Error", e.getMessage()));
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String cusId = req.getParameter("cusId");
        String cusFirstName = req.getParameter("cusFirstName");
        String cusLastName = req.getParameter("cusLastName");
        String cusAddress = req.getParameter("cusAddress");
        String cusSalary = req.getParameter("cusSalary");
        resp.setContentType("application/json");


        try(Connection connection = ConnectionPoolUtil.pool(req).getConnection ()) {

            customerBO.addCustomers(new CustomerDTO(cusId, cusFirstName, cusLastName, cusAddress, cusSalary), connection);

            ResponseUtil.genJson("Success", 200, resp);
        } catch (SQLException e) {
            ResponseUtil.genJson("Success", 200, e, resp);

        }

    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPut(req, resp);
    }
}
