create table wallpaper (
    id serial primary key,
    user_email varchar(255) not null,
    img_description text,
    img_size varchar(255),
    img_url text,
    llm_name varchar(100),
    llm_params JSON,
    created_at timestamptz default now()
)

create table users (
    id serial primary key,
    email varchar(255) unique not null,
    nickname varchar(255),
    avatar_url text,
    created_at timestamptz default now()
)