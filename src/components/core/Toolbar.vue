<template>
  <v-toolbar
    id="core-toolbar"
    app
    flat
    prominent
    style="background: #eee;"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title
        class="tertiary--text font-weight-light"
      >
        <v-btn
          v-if="responsive"
          class="default v-btn--simple"
          dark
          icon
          @click.stop="onClickBtn"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ title }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex
        align-center
        layout
        py-2
      >
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition">
          <router-link
            v-ripple
            slot="activator"
            class="toolbar-items"
            to="/notifications"
          >
            <v-badge
              color="error"
              overlap
            >
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </router-link>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
              >
                <v-list-tile-title
                  v-text="notification"
                />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
        <v-menu
                bottom
                left
                content-class="dropdown-menu"
                offset-y
                transition="slide-y-transition">
          <router-link
                  v-ripple
                  slot="activator"
                  class="toolbar-items"
                  to="/notifications"
          >
              <template slot="badge">
                {{ notifications.length }}
              </template>
              <v-icon color="tertiary">mdi-account</v-icon>
          </router-link>
          <v-card>
            <v-list dense>
              <v-list-tile
                      v-for="notification in loginInfo"
                      :key="notification"
              >
                <v-list-tile-title
                        v-text="notification" @click="handleClick"
                />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>


export default {
  data(){
    return {
      notifications: [
        '请各位管理员认真管理公寓的设施',
        '不可以滥用职权'
      ],
      title: null,
      responsive: false,
      loginInfo: ['登出']
    }
  },

  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },
  methods: {
    handleClick(){
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style>
  #core-toolbar a {
    text-decoration: none;
  }
</style>
