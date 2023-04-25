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
  expect(isStrongPassword('202001265@daiict.ac.in')).toBe(true);
  expect(isStrongPassword('202001276@daiict.ac.in')).toBe(true);
  expect(isStrongPassword('202001426@daiict.ac.in')).toBe(true);
  expect(isStrongPassword('202001267@daiict.ac.in')).toBe(true);
  expect(isStrongPassword('202001241@daiict.ac.in')).toBe(true);
  expect(isStrongPassword('202001139@daiict.ac.in')).toBe(true);
  expect(isStrongPassword('202001254@daiict.ac.in')).toBe(true);
  expect(isStrongPassword('202001266@daiict.ac.in')).toBe(true);
});

test('Password is not Strong enough for security', () => {
  expect(isStrongPassword('202001265@gmail.com')).toBe(false);
  expect(isStrongPassword('20200@daiict.ac.in')).toBe(false);
  expect(isStrongPassword('20200426@daiict.ac.in')).toBe(false);
  expect(isStrongPassword('198001267@daiict.ac.in')).toBe(false);
  expect(isStrongPassword('002001241@daiict.ac.in')).toBe(false);
  expect(isStrongPassword('102001139@daiict.ac.in')).toBe(false);
  expect(isStrongPassword('202001254@daiict.in')).toBe(false);
  expect(isStrongPassword('202001266@gmail.ac.in')).toBe(false);
});
