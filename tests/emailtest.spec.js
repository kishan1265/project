// function to check email is valid
function isValidEmail(email) {
  //return email.length === 22 && /^[0-9]+@daiict.ac.in+$/.test(email);
  if (
    email.substr(-13, 13) != '@daiict.ac.in' ||
    email[1] != '0' ||
    email[0] != '2' ||
    !(email[4] == '0' || email[4] == '1' || email[4] == '2') ||
    !(
      email[5] == '0' ||
      email[5] == '1' ||
      email[5] == '2' ||
      email[5] == '3'
    ) ||
    email[6] >= '6'
  ) {
    return false;
  }

  return true;
}

test('Email is valid for registration', () => {
  expect(isValidEmail('202001265@daiict.ac.in')).toBe(true);
  expect(isValidEmail('202001276@daiict.ac.in')).toBe(true);
  expect(isValidEmail('202001426@daiict.ac.in')).toBe(true);
  expect(isValidEmail('202001267@daiict.ac.in')).toBe(true);
  expect(isValidEmail('202001241@daiict.ac.in')).toBe(true);
  expect(isValidEmail('202001139@daiict.ac.in')).toBe(true);
  expect(isValidEmail('202001254@daiict.ac.in')).toBe(true);
  expect(isValidEmail('202001266@daiict.ac.in')).toBe(true);
});

test('Email is not valid for registration', () => {
  expect(isValidEmail('202001265@gmail.com')).toBe(false);
  expect(isValidEmail('20200@daiict.ac.in')).toBe(false);
  expect(isValidEmail('20200426@daiict.ac.in')).toBe(false);
  expect(isValidEmail('198001267@daiict.ac.in')).toBe(false);
  expect(isValidEmail('002001241@daiict.ac.in')).toBe(false);
  expect(isValidEmail('102001139@daiict.ac.in')).toBe(false);
  expect(isValidEmail('202001254@daiict.in')).toBe(false);
  expect(isValidEmail('202001266@gmail.ac.in')).toBe(false);
});
