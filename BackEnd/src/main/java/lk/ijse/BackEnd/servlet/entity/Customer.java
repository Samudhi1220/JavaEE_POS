package lk.ijse.BackEnd.servlet.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Customer {
    private String id;
    private String firstName;
    private String lastName;
    private String address;
    private String salary;

}
