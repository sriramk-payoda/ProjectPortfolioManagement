BEGIN;
    CREATE TABLE requestors
    (
        "id" character varying(100),
        "requestor_name" character varying(30),
        "email_id" character varying(30),
        "phone_no" bigint,
        PRIMARY KEY ("id")
    );

    CREATE TABLE project_requests
    (
        "id" character varying(100),
        "project_name" character varying,
        "business_unit" character varying,
        "start_date" date,
        "end_date" date,
        "business_priority" character varying,
        "requestor_id" character varying(30),
        PRIMARY KEY ("id")
    );

    ALTER TABLE project_requests
        ADD FOREIGN KEY ("requestor_id")
        REFERENCES requestors ("id")
        NOT VALID;
END;

