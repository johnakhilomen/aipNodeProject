INSERT INTO aip_users(fullname,username,password,date_created)
VALUES
('Divya Natarajan', 'divyanat','Genericpass123!',now() - '0 days'::INTERVAL),
('Daenerys Targaryen', 'dtarg','Genericpass123!',now() - '0 days'::INTERVAL),
('Uhtred Ragnarsson', 'uragnar', 'Genericpass123!',now() - '0 days'::INTERVAL)
;
