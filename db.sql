--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2022-11-20 23:22:58

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
-- TOC entry 6 (class 2615 OID 16548)
-- Name: LaTaverneDeLimaginaire; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "LaTaverneDeLimaginaire";


ALTER SCHEMA "LaTaverneDeLimaginaire" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16679)
-- Name: borrow_borrow_id_seq; Type: SEQUENCE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE SEQUENCE "LaTaverneDeLimaginaire".borrow_borrow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "LaTaverneDeLimaginaire".borrow_borrow_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16549)
-- Name: borrow; Type: TABLE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE TABLE "LaTaverneDeLimaginaire".borrow (
    copy_id integer NOT NULL,
    user_id integer NOT NULL,
    borrowing_date date NOT NULL,
    return_date date NOT NULL,
    comment text,
    borrow_id integer DEFAULT nextval('"LaTaverneDeLimaginaire".borrow_borrow_id_seq'::regclass) NOT NULL
);


ALTER TABLE "LaTaverneDeLimaginaire".borrow OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16554)
-- Name: comment_comment_id_seq; Type: SEQUENCE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE SEQUENCE "LaTaverneDeLimaginaire".comment_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "LaTaverneDeLimaginaire".comment_comment_id_seq OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16555)
-- Name: comment; Type: TABLE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE TABLE "LaTaverneDeLimaginaire".comment (
    comment_id integer DEFAULT nextval('"LaTaverneDeLimaginaire".comment_comment_id_seq'::regclass) NOT NULL,
    game_id integer NOT NULL,
    user_id integer NOT NULL,
    text text,
    date date NOT NULL,
    note real NOT NULL
);


ALTER TABLE "LaTaverneDeLimaginaire".comment OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16561)
-- Name: copy; Type: TABLE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE TABLE "LaTaverneDeLimaginaire".copy (
    game_id integer NOT NULL,
    localisation_id integer NOT NULL,
    copy_id integer NOT NULL,
    description text,
    is_available boolean DEFAULT false NOT NULL
);


ALTER TABLE "LaTaverneDeLimaginaire".copy OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16567)
-- Name: copy_copy_id_seq; Type: SEQUENCE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE SEQUENCE "LaTaverneDeLimaginaire".copy_copy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "LaTaverneDeLimaginaire".copy_copy_id_seq OWNER TO postgres;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 219
-- Name: copy_copy_id_seq; Type: SEQUENCE OWNED BY; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER SEQUENCE "LaTaverneDeLimaginaire".copy_copy_id_seq OWNED BY "LaTaverneDeLimaginaire".copy.copy_id;


--
-- TOC entry 220 (class 1259 OID 16568)
-- Name: event_events_id_seq; Type: SEQUENCE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE SEQUENCE "LaTaverneDeLimaginaire".event_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "LaTaverneDeLimaginaire".event_events_id_seq OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16569)
-- Name: event; Type: TABLE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE TABLE "LaTaverneDeLimaginaire".event (
    events_id integer DEFAULT nextval('"LaTaverneDeLimaginaire".event_events_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    date date NOT NULL,
    localisation_id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE "LaTaverneDeLimaginaire".event OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16575)
-- Name: game_game_id_seq; Type: SEQUENCE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE SEQUENCE "LaTaverneDeLimaginaire".game_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "LaTaverneDeLimaginaire".game_game_id_seq OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16576)
-- Name: game; Type: TABLE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE TABLE "LaTaverneDeLimaginaire".game (
    game_id integer DEFAULT nextval('"LaTaverneDeLimaginaire".game_game_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    number_of_player character varying(255) DEFAULT 'no data'::character varying NOT NULL,
    average_time character varying(255) DEFAULT 'no data'::character varying NOT NULL,
    description text NOT NULL,
    author character varying(255),
    editor character varying(255)
);


ALTER TABLE "LaTaverneDeLimaginaire".game OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16584)
-- Name: game_tag; Type: TABLE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE TABLE "LaTaverneDeLimaginaire".game_tag (
    game_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE "LaTaverneDeLimaginaire".game_tag OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16587)
-- Name: image_image_id_seq; Type: SEQUENCE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE SEQUENCE "LaTaverneDeLimaginaire".image_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "LaTaverneDeLimaginaire".image_image_id_seq OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16588)
-- Name: image; Type: TABLE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE TABLE "LaTaverneDeLimaginaire".image (
    image_id integer DEFAULT nextval('"LaTaverneDeLimaginaire".image_image_id_seq'::regclass) NOT NULL,
    game_id integer NOT NULL,
    image_png bytea
);


ALTER TABLE "LaTaverneDeLimaginaire".image OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16594)
-- Name: localisation_localisation_id_seq; Type: SEQUENCE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE SEQUENCE "LaTaverneDeLimaginaire".localisation_localisation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "LaTaverneDeLimaginaire".localisation_localisation_id_seq OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16595)
-- Name: localisation; Type: TABLE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE TABLE "LaTaverneDeLimaginaire".localisation (
    localisation_id integer DEFAULT nextval('"LaTaverneDeLimaginaire".localisation_localisation_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE "LaTaverneDeLimaginaire".localisation OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16599)
-- Name: tag_tag_id_seq; Type: SEQUENCE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE SEQUENCE "LaTaverneDeLimaginaire".tag_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "LaTaverneDeLimaginaire".tag_tag_id_seq OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16600)
-- Name: tag; Type: TABLE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE TABLE "LaTaverneDeLimaginaire".tag (
    tag_id integer DEFAULT nextval('"LaTaverneDeLimaginaire".tag_tag_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE "LaTaverneDeLimaginaire".tag OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16604)
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE SEQUENCE "LaTaverneDeLimaginaire".user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "LaTaverneDeLimaginaire".user_user_id_seq OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16605)
-- Name: user; Type: TABLE; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

CREATE TABLE "LaTaverneDeLimaginaire"."user" (
    user_id integer DEFAULT nextval('"LaTaverneDeLimaginaire".user_user_id_seq'::regclass) NOT NULL,
    last_name character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    email_address character varying(255) NOT NULL,
    password text NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    username character varying(255)
);


ALTER TABLE "LaTaverneDeLimaginaire"."user" OWNER TO postgres;

--
-- TOC entry 3220 (class 2604 OID 16612)
-- Name: copy copy_id; Type: DEFAULT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".copy ALTER COLUMN copy_id SET DEFAULT nextval('"LaTaverneDeLimaginaire".copy_copy_id_seq'::regclass);


--
-- TOC entry 3232 (class 2606 OID 16687)
-- Name: borrow borrow_pkey; Type: CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".borrow
    ADD CONSTRAINT borrow_pkey PRIMARY KEY (borrow_id);


--
-- TOC entry 3234 (class 2606 OID 16614)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3236 (class 2606 OID 16616)
-- Name: copy copy_pkey; Type: CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".copy
    ADD CONSTRAINT copy_pkey PRIMARY KEY (copy_id);


--
-- TOC entry 3238 (class 2606 OID 16618)
-- Name: event event_pkey; Type: CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".event
    ADD CONSTRAINT event_pkey PRIMARY KEY (events_id);


--
-- TOC entry 3240 (class 2606 OID 16620)
-- Name: game game_pkey; Type: CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".game
    ADD CONSTRAINT game_pkey PRIMARY KEY (game_id);


--
-- TOC entry 3242 (class 2606 OID 16622)
-- Name: image image_pkey; Type: CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".image
    ADD CONSTRAINT image_pkey PRIMARY KEY (image_id);


--
-- TOC entry 3244 (class 2606 OID 16624)
-- Name: localisation localisation_pkey; Type: CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".localisation
    ADD CONSTRAINT localisation_pkey PRIMARY KEY (localisation_id);


--
-- TOC entry 3246 (class 2606 OID 16626)
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (tag_id);


--
-- TOC entry 3248 (class 2606 OID 16628)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire"."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3249 (class 2606 OID 16629)
-- Name: borrow copy_id_borrow; Type: FK CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".borrow
    ADD CONSTRAINT copy_id_borrow FOREIGN KEY (copy_id) REFERENCES "LaTaverneDeLimaginaire".copy(copy_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3256 (class 2606 OID 16634)
-- Name: game_tag game_id; Type: FK CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".game_tag
    ADD CONSTRAINT game_id FOREIGN KEY (game_id) REFERENCES "LaTaverneDeLimaginaire".game(game_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3251 (class 2606 OID 16639)
-- Name: comment game_id_comment; Type: FK CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".comment
    ADD CONSTRAINT game_id_comment FOREIGN KEY (game_id) REFERENCES "LaTaverneDeLimaginaire".game(game_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3258 (class 2606 OID 16644)
-- Name: image game_id_image; Type: FK CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".image
    ADD CONSTRAINT game_id_image FOREIGN KEY (game_id) REFERENCES "LaTaverneDeLimaginaire".game(game_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3253 (class 2606 OID 16649)
-- Name: copy game_id_localised; Type: FK CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".copy
    ADD CONSTRAINT game_id_localised FOREIGN KEY (game_id) REFERENCES "LaTaverneDeLimaginaire".game(game_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3254 (class 2606 OID 16654)
-- Name: copy localisation_id; Type: FK CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".copy
    ADD CONSTRAINT localisation_id FOREIGN KEY (localisation_id) REFERENCES "LaTaverneDeLimaginaire".localisation(localisation_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3255 (class 2606 OID 16659)
-- Name: event localisation_id_events; Type: FK CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".event
    ADD CONSTRAINT localisation_id_events FOREIGN KEY (localisation_id) REFERENCES "LaTaverneDeLimaginaire".localisation(localisation_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3257 (class 2606 OID 16664)
-- Name: game_tag tag_id; Type: FK CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".game_tag
    ADD CONSTRAINT tag_id FOREIGN KEY (tag_id) REFERENCES "LaTaverneDeLimaginaire".tag(tag_id) NOT VALID;


--
-- TOC entry 3250 (class 2606 OID 16669)
-- Name: borrow user_id_borrow; Type: FK CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".borrow
    ADD CONSTRAINT user_id_borrow FOREIGN KEY (user_id) REFERENCES "LaTaverneDeLimaginaire"."user"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3252 (class 2606 OID 16674)
-- Name: comment user_id_comment; Type: FK CONSTRAINT; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

ALTER TABLE ONLY "LaTaverneDeLimaginaire".comment
    ADD CONSTRAINT user_id_comment FOREIGN KEY (user_id) REFERENCES "LaTaverneDeLimaginaire"."user"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA "LaTaverneDeLimaginaire"; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA "LaTaverneDeLimaginaire" FROM postgres;
GRANT ALL ON SCHEMA "LaTaverneDeLimaginaire" TO application;


--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 233
-- Name: SEQUENCE borrow_borrow_id_seq; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON SEQUENCE "LaTaverneDeLimaginaire".borrow_borrow_id_seq TO application;


--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 215
-- Name: TABLE borrow; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON TABLE "LaTaverneDeLimaginaire".borrow TO application;


--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 216
-- Name: SEQUENCE comment_comment_id_seq; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON SEQUENCE "LaTaverneDeLimaginaire".comment_comment_id_seq TO application;


--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 217
-- Name: TABLE comment; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON TABLE "LaTaverneDeLimaginaire".comment TO application;


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE copy; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON TABLE "LaTaverneDeLimaginaire".copy TO application;


--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 220
-- Name: SEQUENCE event_events_id_seq; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON SEQUENCE "LaTaverneDeLimaginaire".event_events_id_seq TO application;


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 221
-- Name: TABLE event; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON TABLE "LaTaverneDeLimaginaire".event TO application;


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 222
-- Name: SEQUENCE game_game_id_seq; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON SEQUENCE "LaTaverneDeLimaginaire".game_game_id_seq TO application;


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 223
-- Name: TABLE game; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON TABLE "LaTaverneDeLimaginaire".game TO application;


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 224
-- Name: TABLE game_tag; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON TABLE "LaTaverneDeLimaginaire".game_tag TO application;


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 225
-- Name: SEQUENCE image_image_id_seq; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON SEQUENCE "LaTaverneDeLimaginaire".image_image_id_seq TO application;


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 226
-- Name: TABLE image; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON TABLE "LaTaverneDeLimaginaire".image TO application;


--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 227
-- Name: SEQUENCE localisation_localisation_id_seq; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON SEQUENCE "LaTaverneDeLimaginaire".localisation_localisation_id_seq TO application;


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 228
-- Name: TABLE localisation; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON TABLE "LaTaverneDeLimaginaire".localisation TO application;


--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 229
-- Name: SEQUENCE tag_tag_id_seq; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON SEQUENCE "LaTaverneDeLimaginaire".tag_tag_id_seq TO application;


--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 230
-- Name: TABLE tag; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON TABLE "LaTaverneDeLimaginaire".tag TO application;


--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 231
-- Name: SEQUENCE user_user_id_seq; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON SEQUENCE "LaTaverneDeLimaginaire".user_user_id_seq TO application;


--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 232
-- Name: TABLE "user"; Type: ACL; Schema: LaTaverneDeLimaginaire; Owner: postgres
--

GRANT ALL ON TABLE "LaTaverneDeLimaginaire"."user" TO application;


-- Completed on 2022-11-20 23:22:58

--
-- PostgreSQL database dump complete
--

