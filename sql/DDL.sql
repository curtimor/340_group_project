SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create tables for Gogurt(products), Orders, Sales, Customers an Suppliers

CREATE OR REPLACE TABLE Customers (
	idCustomer int NOT NULL AUTO_INCREMENT,
    customerName varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    address varchar(100),
    PRIMARY KEY(idCustomer),
    UNIQUE KEY email (email)
);

CREATE OR REPLACE TABLE Suppliers (
	idSupplier int NOT NULL AUTO_INCREMENT,
	supplierName varchar(255) NOT NULL,
	email varchar(100) NOT NULL,
	PRIMARY KEY (idSupplier),
	UNIQUE KEY email (email)
);

CREATE OR REPLACE TABLE Gogurts (
	idGogurt int NOT NULL AUTO_INCREMENT,
    flavor varchar(50) NOT NULL,
    qtyOnHand int(255),
    price float NOT NULL,
    PRIMARY KEY (idGogurt)
);

CREATE OR REPLACE TABLE Orders (
	idOrder int NOT NULL AUTO_INCREMENT,
    idSupplier int,
    orderDate date NOT NULL,
    PRIMARY KEY (idOrder),
    FOREIGN KEY (idSupplier) REFERENCES Suppliers(idSupplier) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE OR REPLACE TABLE Sales (
	idSale int NOT NULL AUTO_INCREMENT,
    idCustomer int,
    shipDate date,
    subTotal float,
    PRIMARY KEY (idSale),
    FOREIGN KEY (idCustomer) REFERENCES Customers(idCustomer) ON DELETE SET NULL ON UPDATE CASCADE
);
   
CREATE OR REPLACE TABLE SalesDetails (
	idSalesDetail int NOT NULL AUTO_INCREMENT,
    sid int NOT NULL,
    gid int NOT NULL,
    salesDate date NOT NULL,
    orderQty int,
    unitPrice float,
    lineTotal float,
    PRIMARY KEY(idSalesDetail, sid, gid),
    FOREIGN KEY (sid) REFERENCES Sales(idSale) ON DELETE CASCADE,
    FOREIGN KEY (gid) REFERENCES Gogurts(idGogurt) ON DELETE CASCADE
);
   
CREATE OR REPLACE TABLE OrderDetails (
	idOrderDetail int NOT NULL AUTO_INCREMENT,
    oid int NOT NULL,
    gid int NOT NULL,
    orderDate date,
    orderQty int,
    unitPrice float,
    lineTotal float,
	PRIMARY KEY(idOrderDetail, oid, gid),
    FOREIGN KEY (oid) REFERENCES Orders(idOrder) ON DELETE CASCADE,
    FOREIGN KEY (gid) REFERENCES Gogurts(idGogurt) ON DELETE CASCADE
);
   
-- Test that the tables were created

DESCRIBE Customers;
DESCRIBE Suppliers;
DESCRIBE Gogurts;
DESCRIBE Orders;
DESCRIBE Sales;
DESCRIBE SalesDetails;
DESCRIBE OrderDetails;

-- insert sample data for each table created above

INSERT INTO Customers(customerName, email, address)
VALUES ("Jerry West", "jwest@sample.com", "123 Nice Ave"),
("Michael East", "meast@sample.com", "1212 Wth Pl"),
("Sara South", "ssouth@sample.com", "633 Yolo Dr");

INSERT INTO Suppliers(supplierName, email)
VALUES ("Good Yogurt Co.", "goodyogurt@sample.com"),
("All Curds Inc.", "allcurds@sample.com"),
("South Sides Products", "sideproducts@sample.com");

INSERT INTO Gogurts(flavor, qtyOnHand, price)
VALUES ("Cherry", 25, 2.99),
("Watermelon", 150, 2.99),
("Green Apple", 99, 3.49);

INSERT INTO Orders(idSupplier, orderDate)
VALUES (1, '2022-03-05'),
(2, '2021-12-14'),
(3, '2022-11-12');

INSERT INTO Sales(idCustomer, shipDate, subTotal)
VALUES(1, '2022-02-20', 100.25),
(1, '2022-12-10', 235.98),
(2, '2022-08-21', 744.35),
(3, '2023-01-06', 113.88);

INSERT INTO SalesDetails(sid, gid, salesDate, orderQty, unitPrice, lineTotal)
VALUES(1, 1, '2022-02-13', 4, 2.99, 11.96),
(1, 2, '2022-02-13', 3, 2.99, 8.97),
(2, 3, '2022-11-13', 6, 3.49, 20.94),
(3, 2, '2021-12-17', 8, 2.99, 23.95);

INSERT INTO OrderDetails(oid, gid, orderDate, orderQty, unitPrice, lineTotal)
VALUES(1, 1, '2021-12-16', 16, 1.99, 31.84),
(1, 2, '2021-12-16', 14, 1.99, 27.86),
(2, 3, '2022-06-17', 22, 2.06, 45.32),
(2, 1, '2022-10-20', 110, 1.88, 206.80);

-- test that the sample data has been inserted

SELECT * FROM Gogurts;
SELECT * FROM Customers;
SELECT * FROM Suppliers;
SELECT * FROM Orders;
SELECT * FROM Sales;
SELECT * FROM SalesDetails;
SELECT * FROM OrderDetails;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
