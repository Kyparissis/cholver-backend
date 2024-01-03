'use strict';

// Array to represent a list of sample ads with users
const sampleAdListWithUsers = [
  // The first ad in the list
  {
    adDescription: 'adDescription',
    date: 'date',
    adID: 0,
    city: 'city',
    title: 'title',
    userID: 6,
    // The user who created the ad
    user: {
      profilePic: '',
      rating: 5.962133916683182,
      fullname: 'fullname',
      userID: 1,
    },
  },
  // The second ad in the list
  {
    adDescription: 'adDescription',
    date: 'date',
    adID: 0,
    city: 'city',
    title: 'title',
    userID: 6,
    // The user who created the ad
    user: {
      profilePic: '',
      rating: 5.962133916683182,
      fullname: 'fullname',
      userID: 1,
    },
  },
];

// Export the sampleAdListWithUsers array when this file is imported
exports.sampleAdListWithUsers = sampleAdListWithUsers;
