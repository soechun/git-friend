<template>
  <div>
    <input type="text" id="username" v-model="username" placeholder="github username"/>
    <b-btn @click="findFriends" variant="info" class="m-1">
      Find Friends
    </b-btn>
    <br/>
    <br/>
    <div v-if="error" id="error">
      <div>{{errorMessage}}</div>
    </div>
    <div v-else-if="friends.length > 0" id="friend-list">
      <div>Your git friends are ...</div>
      <div v-for="friend in friends"
      :key="friend.login">
        {{friend.login}}
      </div>
    </div>

    <div v-if="loading" id="loading">
        Searching Git Friends....
    </div>
  </div>
</template>

<script>

import githubUsernameRegex from 'github-username-regex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      error: false,
      errorMessage: '',
      loading: false,
      friends: [],
      githubURL: 'https://api.github.com/users/'
    }
  },
  methods: {
    // find a friend that u follow and follow u
    matchFriends (followers, following) {
      var followersHash = {}
      for (var i = 0; i < followers.length; i++) {
        followersHash[followers[i].login] = followers[i]
      }
      // use the hash table above to find out if u follow ur follower.
      var friends = following.filter(function (each) {
        if (followersHash[each.login]) {
          return true
        }
      }, followersHash)
      return friends
    },
    // check if username is valid github username
    validUsername (username) {
      return githubUsernameRegex.test(username)
    },
    // check if github user exists
    async checkUserExists (username) {
      try {
        let user = await this.$http.get(this.githubURL + this.username)
        if (user.data.login) {
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },
    // reset the data
    reset () {
      this.error = false
      this.errorMessage = ''
      this.loading = true
      this.friends = []
    },
    // main function to request api call and find out your git friends
    async findFriends () {
      this.reset()
      // Check if username belongs to github
      if (!this.validUsername(this.username)) {
        this.error = true
        this.errorMessage = 'This username seems wrong. Try again'
        this.loading = false
        return
      }

      // check if the user exists
      let userExists = await this.checkUserExists(this.username)
      if (!userExists) {
        this.error = true
        this.errorMessage = 'Sorry, this user does not exists.  You should go and get that username.'
        this.loading = false
        return
      }

      // Get followers and following
      const followingAppend = '/following'
      const followersAppend = '/followers'
      let following = await this.$http.get(this.githubURL + this.username + followingAppend)
      let followers = await this.$http.get(this.githubURL + this.username + followersAppend)

      this.friends = this.matchFriends(followers.data, following.data)
      if (this.friends.length < 1) {
        this.error = true
        this.errorMessage = 'Sorry to hear that you have no friend. add me @soechun'
      }
      this.loading = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
