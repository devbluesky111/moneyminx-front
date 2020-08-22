import { serialize } from 'common/common-helper';
import { groupByProviderName } from 'auth/auth.helper';
import { rawProfileData, groupedProfileData } from '__mocks__/profile-group.mock';

describe('Auth Helper test', () => {
  test.only('should return group by provider name ', () => {
    const res = groupByProviderName(rawProfileData);
    expect(serialize(res)).toBe(serialize(groupedProfileData));
  });
});
