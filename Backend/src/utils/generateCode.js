// Six-digit session verification code, per spec section 40.
// Zero-padded so it is always exactly 6 characters, e.g. "004821".
function generateCode() {
  const n = Math.floor(Math.random() * 1000000);
  return String(n).padStart(6, "0");
}

module.exports = generateCode;
