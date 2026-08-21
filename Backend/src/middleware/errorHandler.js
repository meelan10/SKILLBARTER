// Central error handler. Keeps internal details (Prisma/SQL/JWT errors)
// out of the response per spec section 81 — those belong in server logs.

const errorHandler = (err, req, res, next) => {
  console.error(err);

  let status = err.statusCode || 500;
  let message = err.message || "Server error";

  // Prisma unique constraint violation
  if (err.code === "P2002") {
    status = 409;
    message = "A record with that value already exists";
  }

  // Prisma "record not found"
  if (err.code === "P2025") {
    status = 404;
    message = "Record not found";
  }

  if (status === 500) {
    message = "Something went wrong on our end. Please try again.";
  }

  res.status(status).json({ success: false, message });
};

const notFound = (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
};

module.exports = { errorHandler, notFound };
