// Lightweight manual validation helpers.
// Kept dependency-free on purpose, matching the stack in the spec
// (no Joi / express-validator listed) — good enough for an MVP.

const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

const isValidEmail = (v) =>
  typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const isValidPassword = (v) => typeof v === "string" && v.length >= 6;

const isInt = (v) => Number.isInteger(v) || (typeof v === "string" && /^\d+$/.test(v));

const isOneOf = (v, options) => options.includes(v);

const isValidRating = (v) => Number.isInteger(v) && v >= 1 && v <= 5;

module.exports = {
  isNonEmptyString,
  isValidEmail,
  isValidPassword,
  isInt,
  isOneOf,
  isValidRating,
};
