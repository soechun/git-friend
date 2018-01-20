<template>
  <div>
    <input type="text" id="username" v-model="username"/>
    <b-btn @click="findFriends" variant="info" class="m-1">
      Find Friends
    </b-btn>
    <br/>
    <br/>
    <div v-for="friend in friends">
      {{friend.login}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: 0,
      result: '',
      followers: '',
      following: '',
      friends: []
    }
  },
  methods: {
    showAlert () {
      this.username = this.username + 1
    },
    matchFriends (followers, following) {
      console.log('Finding Friends')
      var followersHash = {}
      for (var i = 0; i < followers.length; i++) {
        followersHash[followers[i].login] = followers[i]
      }
      var friends = following.filter(function (each) {
        if (followersHash[each.login]) {
          return true
        }
      }, followersHash)
      return friends
    },
    async findFriends () {
      const baseURL = 'https://api.github.com/users/'
      const followingAppend = '/following'
      const followersAppend = '/followers'
      let following = await this.$http.get(baseURL + this.username + followingAppend)
      let followers = await this.$http.get(baseURL + this.username + followersAppend)
      this.followers = followers.data
      this.following = following.data
      this.friends = this.matchFriends(this.followers, this.following)
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
