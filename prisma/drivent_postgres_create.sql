CREATE TABLE "public.User" (
	"id" serial NOT NULL,
	"email" serial NOT NULL,
	"passwod" serial NOT NULL,
	"password" serial NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT 'now',
	"updatedAt" DATE NOT NULL DEFAULT 'now',
	"updatedAt" DATE NOT NULL DEFAULT 'now',
	CONSTRAINT "User_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Event" (
	"id" serial NOT NULL,
	"title" TEXT(255) NOT NULL,
	"backgroundImageUrl" TEXT(255) NOT NULL,
	"logoImageUrl" TEXT(255) NOT NULL,
	"startsAt" DATE NOT NULL,
	"endsAt" DATE NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT 'now()',
	"updatedAt" DATE NOT NULL,
	CONSTRAINT "Event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Enrollment" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"cpf" TEXT NOT NULL,
	"birthday" DATE NOT NULL,
	"phone" TEXT NOT NULL,
	"userId" int NOT NULL UNIQUE,
	"createdAt" DATE NOT NULL,
	"updatedAt" DATE NOT NULL,
	CONSTRAINT "Enrollment_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Address" (
	"id" serial NOT NULL,
	"cep" TEXT NOT NULL,
	"street" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"number" TEXT NOT NULL,
	"neighborhood" TEXT NOT NULL,
	"addressDetail" TEXT,
	"enrollmentId" int UNIQUE,
	"createdAt" DATE NOT NULL DEFAULT 'now()',
	"updatedAt" DATE NOT NULL,
	CONSTRAINT "Address_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Hotels" (
	"id" serial NOT NULL UNIQUE,
	"nome" TEXT NOT NULL UNIQUE,
	"imagePath" TEXT NOT NULL UNIQUE,
	CONSTRAINT "Hotels_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Rooms" (
	"id" serial NOT NULL,
	"hotelId" int NOT NULL,
	"number" TEXT NOT NULL,
	"styleId" int NOT NULL,
	CONSTRAINT "Rooms_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.tickets" (
	"id" serial NOT NULL,
	"isVirtual" BOOLEAN NOT NULL,
	"description" TEXT,
	CONSTRAINT "tickets_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.eventTickets" (
	"id" serial NOT NULL,
	"eventId" serial NOT NULL,
	"ticketId" serial NOT NULL,
	"price" int NOT NULL,
	"name" TEXT,
	"hotelPrice" int NOT NULL,
	CONSTRAINT "eventTickets_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.enrollmentTicket" (
	"id" serial NOT NULL,
	"enrollmentId" serial NOT NULL,
	"eventTicketId" serial NOT NULL,
	"roomId" serial DEFAULT 'null',
	CONSTRAINT "enrollmentTicket_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.roomStyles" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"beds" int NOT NULL,
	CONSTRAINT "roomStyles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id");

ALTER TABLE "Address" ADD CONSTRAINT "Address_fk0" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id");


ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_fk0" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id");
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_fk1" FOREIGN KEY ("styleId") REFERENCES "roomStyles"("id");


ALTER TABLE "eventTickets" ADD CONSTRAINT "eventTickets_fk0" FOREIGN KEY ("eventId") REFERENCES "Event"("id");
ALTER TABLE "eventTickets" ADD CONSTRAINT "eventTickets_fk1" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id");

ALTER TABLE "enrollmentTicket" ADD CONSTRAINT "enrollmentTicket_fk0" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id");
ALTER TABLE "enrollmentTicket" ADD CONSTRAINT "enrollmentTicket_fk1" FOREIGN KEY ("eventTicketId") REFERENCES "eventTickets"("id");
ALTER TABLE "enrollmentTicket" ADD CONSTRAINT "enrollmentTicket_fk2" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id");












