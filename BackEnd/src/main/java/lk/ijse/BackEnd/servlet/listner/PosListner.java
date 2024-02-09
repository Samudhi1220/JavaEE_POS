package lk.ijse.BackEnd.servlet.listner;

import org.apache.commons.dbcp2.BasicDataSource;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebListener;

@WebListener
public class PosListner implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        ServletContext servletContext = servletContextEvent.getServletContext();
        BasicDataSource pool = new BasicDataSource();
        pool.setDriverClassName("com.mysql.cj.jdbc.Driver");
        pool.setUrl("jdbc:mysql://localhost:3306/javaEE_POS");
        pool.setUsername("root");
        pool.setPassword("Samu1130");
        pool.setInitialSize(5);
        pool.setMaxTotal(5);
        servletContext.setAttribute("pos", pool);

    }
}
