package lk.ijse.BackEnd.servlet.dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public interface CrudDAO<T> extends SuperDAO {
    public boolean add(T entity, Connection connection) throws SQLException;
    ArrayList<T> getAll(Connection connection) throws SQLException;
}
