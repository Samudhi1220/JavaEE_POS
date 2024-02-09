package lk.ijse.BackEnd.servlet.bo;

import lk.ijse.BackEnd.servlet.dto.CustomerDTO;
import org.apache.commons.dbcp2.BasicDataSource;

import javax.servlet.http.HttpServletRequest;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public interface CustomerBO extends SuperBO{
//    BasicDataSource pool (HttpServletRequest req);
    public boolean addCustomers(CustomerDTO dto, Connection connection) throws SQLException;
    public ArrayList<CustomerDTO> getAllCustomers(Connection connection) throws SQLException;
    public boolean updateCustomer(CustomerDTO dto,Connection connection) throws SQLException;
}
