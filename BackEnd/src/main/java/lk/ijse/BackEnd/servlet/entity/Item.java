package lk.ijse.BackEnd.servlet.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Item {
   private String id;

  private String itemName;

  private String itemPrice;

  private String itemQty;
}
