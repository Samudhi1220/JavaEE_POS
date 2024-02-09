package lk.ijse.BackEnd.servlet.dao.custom;

import lk.ijse.BackEnd.servlet.dao.CustomerDAO;
import lk.ijse.BackEnd.servlet.entity.Customer;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerDAOimpl implements CustomerDAO {

    private CustomerDAOimpl customerDAOimpl;
        @Override
    public boolean add(Customer entity, Connection connection) throws SQLException {
        return connection.createStatement().executeUpdate
                ("INSERT INTO customer VALUES ('" + entity.getId() + "','" + entity.getFirstName() + "','" + entity.getLastName() + "','" + entity.getAddress() + "','" + entity.getSalary() + "')") > 0;

    }

    @Override
    public ArrayList<Customer> getAll(Connection connection) throws SQLException {
        ArrayList<Customer> allCustomers = new ArrayList<>();
        ResultSet resultSet = connection.createStatement().executeQuery("Select * from customer");

        while (resultSet.next()) {
            Customer customer = new Customer(resultSet.getString("id"),
                    resultSet.getString("firstName"), resultSet.getString("lastName"),
                    resultSet.getString("address"),resultSet.getString("salary"));

            allCustomers.add(customer);
        }
        return allCustomers;
    }
}
