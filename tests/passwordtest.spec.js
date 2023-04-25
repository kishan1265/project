// function to check email is valid
function isStrongPassword(password) {
  const minLength = 6; // Minimum length requirement
  const maxLength = 64; // Maximum length requirement
  const hasUpperCase = /[A-Z]/.test(password); // Upper case letters requirement
  const hasLowerCase = /[a-z]/.test(password); // Lower case letters requirement
  const hasNumber = /[0-9]/.test(password); // Numbers requirement
  const hasSpecialChar = /[$&+,:;=?@#|'<>.^*()%!-]/.test(password); // Special characters requirement
  const isCommonPassword = /password|123456|qwerty/i.test(password); // Common password check

  if (password.length < minLength || password.length > maxLength) {
    return false;
  }

  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return false;
  }

  if (isCommonPassword) {
    return false;
  }

  return true;
}

test('Password is Strong enough for security', () => {
  expect(isStrongPassword('Chalodiya@76')).toBe(true);
  expect(isStrongPassword('Sanghani$65')).toBe(true);
  expect(isStrongPassword('Archit#74')).toBe(true);
  expect(isStrongPassword('Adhiya@77')).toBe(true);
  expect(isStrongPassword('Fenil@123')).toBe(true);
  expect(isStrongPassword('Krunal%987')).toBe(true);
  expect(isStrongPassword('Deep@@00')).toBe(true);
  expect(isStrongPassword('Tushar.678')).toBe(true);
});

test('Password is not Strong enough for security', () => {
  expect(isStrongPassword('archit12345')).toBe(false);
  expect(isStrongPassword('Abc@1')).toBe(false);
  expect(isStrongPassword('kishansanghani65')).toBe(false);
  expect(isStrongPassword('omchalodiya')).toBe(false);
  expect(isStrongPassword('leadtester')).toBe(false);
  expect(isStrongPassword('123456789')).toBe(false);
  expect(isStrongPassword('aa11bb33')).toBe(false);
  expect(isStrongPassword('qwertyuiop')).toBe(false);
});
