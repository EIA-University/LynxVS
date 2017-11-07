var images = [
    "https://images.unsplash.com/photo-1473294312123-83488e2f8e8f?auto=format&fit=crop&w=1352&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D", // Owl
    "https://images.unsplash.com/photo-1500924129382-a1e21bf8f212?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxh", // Place
    "https://images.unsplash.com/photo-1504858700536-882c978a3464?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    "https://images.unsplash.com/reserve/Hxev8VTsTuOJ27thHQdK_DSC_0068.JPG?auto=format&fit=crop&w=1347&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    "https://images.unsplash.com/photo-1504198912477-3018896a9525?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
    "https://images.unsplash.com/photo-1427434991195-f42379e2139d?auto=format&fit=crop&w=1489&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
];

module.exports = function () {
    var rand = Math.floor(Math.random() * (images.length-1));
    return images[rand];
};