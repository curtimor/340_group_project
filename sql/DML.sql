
---------------------Gogurt Inc-----------------
-- These are some Database Manipulation queries for a partially implemented Project Website 
-- using the gogurt database.

-- GOGURT ENTITY
-- get all Gogurt IDs and Flavors 
SELECT idGogurt, flavor, qtyOnHand, price FROM Gogurts

-- add a new Gogurt item
INSERT INTO Gogurts (flavor, qtyOnHand, price) 
   VALUES (:flavorInput, :qtyOnHandInput, :priceInput)

-- delete a gogurt
DELETE FROM Gogurts WHERE idGogurt = :gogurt_ID_selected

-- update a gogurt
UPDATE Gogurts 
   SET flavor = :flavorInput, qtyOnHand= :qtyOnHandInput, 
     price= :priceInput 
   WHERE id= :gogurt_ID_from_the_update_form

--ORDERS ENTITY
-- get all Supplier names to populate the Orders.IdSupplier dropdown  
SELECT Suppliers.supplierName AS IdSuppliers FROM Orders INNER JOIN Suppliers ON Orders.idSupplier = Suppliers.idSupplier

-- get all orders and the supplier name past orders
SELECT Orders.idOrder, orderDate, Suppliers.supplierName AS IdSuppliers FROM Orders INNER JOIN Suppliers ON Orders.idSupplier = Suppliers.idSupplier

-- add a new order
INSERT INTO Orders (IdSuppliers, orderDate) 
   VALUES (:IdSupplierInputFromDropdown, :OrderDateInput)

-- Delete an order
DELETE FROM Orders WHERE idOrder = :order_ID_selected

-- CUSTOMERS ENTITY
-- get all customers information for a customers list
SELECT Customers.idCustomer, customerName, email, address FROM Customers

-- add a new customer
INSERT INTO Customers (customerName, email, address)
    VALUES (:customerNameInput, :emailInput, :addressInput)

-- delete a customer
DELETE FROM Customers WHERE idCustomer = :customer_ID_selected

-- SALES ENTITY
-- get all sales information for a sales list get customers name for each sale
SELECT Sales.idSale, Customers.customerName AS IdCustomer, shipDate, subTotal FROM Sales INNER JOIN Customers ON Sales.idSale = Customers.idCustomer

-- add a new sale
INSERT INTO Sales (idCustomer, shipDate, subTotal)
    VALUES (:idCustomerInput, :shipDateInput, :subtotalInput)

-- delete a sale
DELETE FROM Sales WHERE idSale = :sale_ID_selected

-- SUPPLIER ENTITY
-- get all supplier information for a supplier list
SELECT Suppliers.idSupplier, supplierName, email FROM Suppliers

-- add a supplier
INSERT INTO Suppliers (supplierName, email)
    VALUES (:supplierNameInput, :emailInput)

-- delete a supplier
DELETE FROM Suppliers WHERE idSupplier = :supplier_ID_selected

-- SALESDETAILS ENTITY
-- get all proir sales details for the salesDetails list
SELECT sid, Gogurts.flavor AS gid, salesDate, orderQty, unitPrice, lineTotal FROM SalesDetails INNER JOIN Gogurts ON SalesDetails.gid = Gogurts.idGogurt

-- add a new sale into salesDetail
INSERT INTO salesDetail (sid, gid, salesDate, orderQty, unitPrice, lineTotal)
    VALUES (:sidInput, :gidInput, :salesDateInput, :orderQtyInputSales, :unitPriceInput :lineTotalInput)

-- ORDERDETAILS ENTITY
-- get all proir orders details for a orderDetails
SELECT oid, Gogurts.flavor AS gid, orderQty, unitPrice, lineTotal FROM OrderDetails INNER JOIN Gogurts ON OrderDetails.gid = Gogurts.idGogurt

-- add a new order into orderDetail
INSERT INTO orderDetail (0id, gid, orderQty, unitPrice, lineTotal)
    VALUES (:sidInput, :gidInput, :orderQtyInput, :unitPriceInput :lineTotalInput)

-- DELETE from salesDetails and OrderDetails
-- dis-associate a gogurt from a order (M-to-M relationship deletion)
DELETE FROM SalesDetails WHERE sid = :sales_ID_selected_from_saleDetails_list AND gid = :gogurt_ID_selected_from-salesDetails_list

-- dis-associate a gogurt from a sale (M-to-M relationship deletion)
DELETE FROM OrdersDetails WHERE oid = :order_ID_selected_from_orderDetails_list AND gid = :gogurt_ID_selected_from-orderDetails_list
