package lk.ijse.BackEnd.servlet.bo.custom;

import lk.ijse.BackEnd.servlet.bo.CustomerBO;
import lk.ijse.BackEnd.servlet.dao.CustomerDAO;
import lk.ijse.BackEnd.servlet.dao.DAOFactory;
import lk.ijse.BackEnd.servlet.dto.CustomerDTO;
import lk.ijse.BackEnd.servlet.entity.Customer;
import org.apache.commons.dbcp2.BasicDataSource;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerBOimpl implements CustomerBO {

    CustomerDAO customerDAO = (CustomerDAO) DAOFactory.getBoFactory().getDAO(DAOFactory.DAOTypes.CUSTOMER);


//    @Override
//    public BasicDataSource pool(HttpServletRequest req) {
//        return null;
//    }

    @Override
    public boolean addCustomers(CustomerDTO dto, Connection connection) throws SQLException {
        return customerDAO.add(new Customer(dto.getId(), dto.getFirstName(), dto.getLastName(),dto.getAddress(), dto.getSalary()),connection);

    }

    @Override
    public ArrayList<CustomerDTO> getAllCustomers(Connection connection) throws SQLException {
        ArrayList<CustomerDTO> allCustomers = new ArrayList<>();

        ArrayList<Customer> allEntity = customerDAO.getAll(connection);
        for (Customer c : allEntity) {
            allCustomers.add(new CustomerDTO(c.getId(),c.getFirstName(),c.getLastName(),c.getAddress(),c.getSalary()));
        }
        return allCustomers;
    }
    @Override
    public boolean updateCustomer(CustomerDTO dto, Connection connection) throws SQLException {
        return customerDAO.update(new Customer(dto.getId(), dto.getFirstName(), dto.getLastName(), dto.getAddress(), dto.getSalary()),connection);

    }

}
