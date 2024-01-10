import { Linking } from 'react-native'

export default {
  prefixes: ['game://', 'https://game.com'], //'game:/',
  config: {
    screens: {
      // HomeScreen: {
      //   path: 'tourney/:id',
      // },
      MafiaNavigator: {
        screens: {
          WaitPlayers: {
            path: 'playMafia/:id',
          },
        },
      },
      AliasNavigator: {
        screens: {
          InviteTeamPlayers: {
            path: 'playAlias/:id',
          },
        },
      },
      CrocodileNavigator: {
        screens: {
          InviteTeamPlayers: {
            path: 'playCrocodile/:id',
          },
        },
      },
      TabNavigator: {
        screens: {
          Home: {
            path: 'participateToGame/:id',
          },
        },
      },
      TabNavigator: {
        path: 'tourney/:id',
      },
      // TabNavigator: {
      //   screens: {
      //     Home: {
      //       path: 'tourney/:id',
      //     },
      //   },
      // },
    },
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }) => {
      listener(url)
    }

    // Listen to incoming links from deep linking
    const _listener = Linking.addEventListener('url', onReceiveURL)

    return () => {
      // Clean up the event listeners
      _listener.remove()
    }
  },
}
