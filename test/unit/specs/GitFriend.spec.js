import GitFriend from '@/components/GitFriend'

describe('GitFriend.vue', () => {
  it('should return correct array that contains elements present on both side', () => {
    expect(GitFriend.methods.matchFriends(
      [{login: 1}, {login: 3}, {login: 2}],
      [{login: 3}, {login: 2}])).deep.equal([{login: 3}, {login: 2}])
  })
  
  it('should validate the username is acceptable to github', () => {
    expect(GitFriend.methods.validUsername('soechun')).to.equal(true)
    expect(GitFriend.methods.validUsername('#')).to.equal(false)
  })

  it('should check if the user exists', () => {
    GitFriend.methods.checkUserExists('soechun').then(function (result) {
      result.should.equal(true)
    })
    GitFriend.methods.checkUserExists('12312123123123123').then(function (result) {
      result.should.equal(false)
    })
  })
})
