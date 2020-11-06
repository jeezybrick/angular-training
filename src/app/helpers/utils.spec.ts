import { doSomething, getProfileFullName, isAbsoluteUrl } from '@helpers/utils';

describe('Utils', () => {

  describe('isAbsoluteUrl', () => {
    const mockRelativeUrl = '/users';
    const mockAbsoluteUrl = 'https://www.youtube.com/users';

    it('should return false if relative url', () => {
      expect(isAbsoluteUrl(mockRelativeUrl)).toBe(false);
    });

    it('should return true if relative url', () => {
      expect(isAbsoluteUrl(mockAbsoluteUrl)).toBe(true);
    });

  });

  describe('getProfileFullName', () => {
    const mockValueWithPreferredName = {
      firstName: 'firstName',
      lastName: 'lastName',
      preferredName: 'preferredName',
    };
    const mockValueWithEmptyPreferredName = {
      firstName: 'firstName',
      lastName: 'lastName',
      preferredName: '',
    };
    const mockValueWithNullPreferredName = {
      firstName: 'firstName',
      lastName: 'lastName',
      preferredName: null,
    };
    const concatenatedFirstAndLastName = `${mockValueWithPreferredName.firstName} ${mockValueWithPreferredName.lastName}`;

    it('should return preferred name if it`s not null and if it`s not empty string', () => {
      expect(getProfileFullName(mockValueWithPreferredName)).toBe(mockValueWithPreferredName.preferredName);
    });

    it('should return concatenated firstName and lastName if preferred name is null', () => {
      expect(getProfileFullName(mockValueWithNullPreferredName)).toBe(concatenatedFirstAndLastName);
    });

    it('should return concatenated firstName and lastName if preferred name empty string', () => {
      expect(getProfileFullName(mockValueWithEmptyPreferredName)).toBe(concatenatedFirstAndLastName);
    });

  });

  describe('doSomething', () => {

    it('should return same value', () => {
      const mockString = '123';
      expect(doSomething(mockString)).toBe(mockString);
    });

  });


});
