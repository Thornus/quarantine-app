# Quarantine and self-isolation, monitor your symptoms app

This app is for people who are in quarantine or self-isolation to make this tough time easier.

## Features
- Get a motivational daily reminder to boost your mood (can be deactivated in settings)
- Easily keep track of how many days are left in the quarantine or self-isolation
- Easily monitor your symptoms day by day
- Send an automatically formatted email with your symptoms to your GP or doctor


### Notes about the technology used
The app is made in React Native using mostly functional components and React hooks.

Some components and screens access the global state thanks to the [React Context API](https://reactjs.org/docs/context.html).


### Additional notes

Does it make sense to add "self-isolation"? People who are forced to stay inside because suspected of being infected even when the test turns out negative are indeed in quarantine, not self-isolation.