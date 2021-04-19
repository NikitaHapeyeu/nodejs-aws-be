
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table product (
    id              uuid primary key default uuid_generate_v4(),
    title           text not null,
    description     text,
    price           integer,
    image           text
);

create table stock (
    product_id      uuid references product(id),
    count           integer constraint min_count check (count >=0)
);

insert into product (title, description, price, image) values ('Ball', 'The Football Is Good For Training And Recreational Purposes', 6, 'https://placeimg.com/640/480?30412');
insert into product (title, description, price, image) values ('Salad', 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive', 218, 'https://placeimg.com/640/480?99428');
insert into product (title, description, price, image) values ('Towels', 'Boston most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles', 6, 'https://placeimg.com/640/480?35591');
insert into product (title, description, price, image) values ('Pizza', 'The Football Is Good For Training And Recreational Purposes', 98, 'https://placeimg.com/640/480?80912');
insert into product (title, description, price, image) values ('Fish', 'The Football Is Good For Training And Recreational Purposes', 108, 'https://placeimg.com/640/480?39437');
insert into product (title, description, price, image) values ('Cheese', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', 18, 'https://placeimg.com/640/480?41679');
insert into product (title, description, price, image) values ('Banana', 'The Football Is Good For Training And Recreational Purposes', 146, 'https://placeimg.com/640/480?33706');
insert into product (title, description, price, image) values ('Mouse', 'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J', 142, 'https://placeimg.com/640/480?92212');

insert into stock (product_id, count) select id, 10 from product where title = 'Ball';
insert into stock (product_id, count) select id, 11 from product where title = 'Salad';
insert into stock (product_id, count) select id, 12 from product where title = 'Towels';
insert into stock (product_id, count) select id, 9 from product where title = 'Pizza';
insert into stock (product_id, count) select id, 5 from product where title = 'Fish';
insert into stock (product_id, count) select id, 15 from product where title = 'Cheese';
insert into stock (product_id, count) select id, 4 from product where title = 'Banana';
insert into stock (product_id, count) select id, 1 from product where title = 'Mouse';