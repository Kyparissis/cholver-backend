// fixture for a sample array of two ads
// each ad contains the user who created it

'use strict';

const user = {
  profilePic: '',
  rating: 5.962133916683182,
  fullname: 'fullname',
  userID: 1,
};

const ad = {
  adDescription: 'adDescription',
  date: 'date',
  adID: 0,
  city: 'city',
  title: 'title',
  userID: 6,
  // The user who created the ad
  user,
};

// Array to represent a list of sample ads with users
const sampleAdListWithUsers = [
  ad,
  ad,
];

// Export the sampleAdListWithUsers array when this file is imported
exports.sampleAdListWithUsers = sampleAdListWithUsers;
