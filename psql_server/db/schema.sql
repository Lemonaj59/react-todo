--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7 (Ubuntu 13.7-0ubuntu0.21.10.1)
-- Dumped by pg_dump version 13.7 (Ubuntu 13.7-0ubuntu0.21.10.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auths (
    auths_id integer NOT NULL,
    username text NOT NULL,
    user_password text NOT NULL,
    CONSTRAINT auths_user_password_check CHECK ((length(user_password) > 7)),
    CONSTRAINT auths_username_check CHECK ((length(username) > 6))
);


ALTER TABLE public.auths OWNER TO postgres;

--
-- Name: auths_auths_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auths_auths_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auths_auths_id_seq OWNER TO postgres;

--
-- Name: auths_auths_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auths_auths_id_seq OWNED BY public.auths.auths_id;


--
-- Name: list_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.list_items (
    list_item_id integer NOT NULL,
    list_id integer NOT NULL,
    item text NOT NULL,
    item_description text,
    duration integer
);


ALTER TABLE public.list_items OWNER TO postgres;

--
-- Name: list_items_list_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.list_items_list_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.list_items_list_item_id_seq OWNER TO postgres;

--
-- Name: list_items_list_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.list_items_list_item_id_seq OWNED BY public.list_items.list_item_id;


--
-- Name: lists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lists (
    list_id integer NOT NULL,
    user_id integer NOT NULL,
    list_name text NOT NULL,
    list_type text DEFAULT 'not timed'::text NOT NULL,
    CONSTRAINT lists_list_type_check CHECK (((list_type = 'not timed'::text) OR (list_type = 'timed'::text) OR (list_type = 'not timed no description'::text) OR (list_type = 'timed no description'::text)))
);


ALTER TABLE public.lists OWNER TO postgres;

--
-- Name: lists_list_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lists_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lists_list_id_seq OWNER TO postgres;

--
-- Name: lists_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lists_list_id_seq OWNED BY public.lists.list_id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL,
    "user" json
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: auths auths_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auths ALTER COLUMN auths_id SET DEFAULT nextval('public.auths_auths_id_seq'::regclass);


--
-- Name: list_items list_item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list_items ALTER COLUMN list_item_id SET DEFAULT nextval('public.list_items_list_item_id_seq'::regclass);


--
-- Name: lists list_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lists ALTER COLUMN list_id SET DEFAULT nextval('public.lists_list_id_seq'::regclass);


--
-- Data for Name: auths; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auths (auths_id, username, user_password) FROM stdin;
2	lemon123	thispass
3	321nomel	ssapsiht
18	asdfasdf	asdfasdf
\.


--
-- Data for Name: list_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.list_items (list_item_id, list_id, item, item_description, duration) FROM stdin;
1	5	first page	finish all of the todo listings	2
2	5	listing todos	finish listing all todos	2
3	5	auths page	finish all of the auths page	2
4	6	loading all pictures	load all pics, and have description	\N
5	6	have hover options	hover options for different catagories	\N
6	6	login for users, and for admin	login if they choose, admin special powers	\N
7	7	testing for actuality		\N
8	8	testing for actuality of timed no description		5
\.


--
-- Data for Name: lists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lists (list_id, user_id, list_name, list_type) FROM stdin;
5	2	todo webpage	timed
6	2	next webpage	not timed
7	3	this is just a text	not timed no description
8	3	this is the actual test	timed no description
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (sid, sess, expire, "user") FROM stdin;
\.


--
-- Name: auths_auths_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auths_auths_id_seq', 18, true);


--
-- Name: list_items_list_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.list_items_list_item_id_seq', 8, true);


--
-- Name: lists_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lists_list_id_seq', 22, true);


--
-- Name: auths auths_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auths
    ADD CONSTRAINT auths_pkey PRIMARY KEY (auths_id);


--
-- Name: auths auths_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auths
    ADD CONSTRAINT auths_username_key UNIQUE (username);


--
-- Name: list_items list_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list_items
    ADD CONSTRAINT list_items_pkey PRIMARY KEY (list_item_id);


--
-- Name: lists lists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (list_id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: list_items list_items_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list_items
    ADD CONSTRAINT list_items_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.lists(list_id) ON DELETE CASCADE;


--
-- Name: lists lists_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.auths(auths_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--
