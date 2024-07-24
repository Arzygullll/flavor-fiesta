import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Modal,
  Box,
  Grow,
  Pagination,
  TextField,
  Stack,
} from "@mui/material";
import { Favorite, Search } from "@mui/icons-material";
import { useCart } from "../context/CartContextProvider";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./BooksPage.css";

const booksData = [
  {
    id: 1,
    title:
      "«The Three Broomsticks», «The Hog's Head» and Other Treats from Hogwarts",
    author: "Jasmin Lehmann",
    description:
      "Harry Potter Baking Recipes. 24 Sweet Surprises from the Magical World",
    image:
      "https://img4.labirint.ru/rc/eba1532bdfdce211a9056ffea0f526bb/363x561q80/books90/894050/cover.jpg?1674888773",
    price: "600",
  },
  {
    id: 2,
    title: "Tasty Tales: Recipes from Turkish TV series",
    author: "Saglam Dahiye",
    description:
      "What do you love about Turkish TV series? Their spice and ability to make you forget everything in anticipation of the next episode! But do you know what else brings vivid emotions? Delicious food! And there’s plenty of it in Turkish TV series. Curious about what Hürrem, Serkan, or Aslı’s favorite dishes taste like?",
    image:
      "https://img3.labirint.ru/rc/7edffe9fefa5f1df6fa91e5b77895e96/363x561q80/books102/1010423/cover.jpg?1712085983",
    price: "1200",
  },
  {
    id: 3,
    title: "Moti. The legendary air dessert from Japan",
    author: "",
    description:
      "Make a trendy Japanese dessert mochi? It's easier than ever with the book 'Moti. The legendary air dessert from Japan'",
    image: "https://cdn.eksmo.ru/v2/ITD000000001343508/COVER/cover1__w820.jpg",
    price: "920",
  },
  {
    id: 4,
    title: "Bento cakes. Sponge, mousse and classic cakes in mini format",
    author: "Svetlana Meshcheryakova",
    description:
      "Bento cakes are a confectionery trend that has not been losing ground for several years. And this is not surprising: spectacular palm—sized cakes in boxes are a touching birthday present, a way to please a loved one or pamper yourself for no reason. Bento cakes can be of any kind: sponge cakes, mousse cakes and even classic ones, only in a reduced format.",
    image: "https://cdn.eksmo.ru/v2/ITD000000001322164/COVER/cover1__w600.jpg",
    price: "1267",
  },
  {
    id: 5,
    title: "Homemade cakes. Recipes that warm the soul",
    author: "Diera Usmanova",
    description:
      "Imagine warm home evenings, the smell of freshly baked cakes and kind smiles illuminating the faces of your loved ones. All this and much more awaits you in this cookbook filled with the most intimate recipes for sweet dishes and delicious desserts. This book is not just a collection of recipes, it is a real treasure trove of family values passed down from generation to generation. Here, between the pages, the author's memories of his grandmother, mother and those moments when the whole family gathered in the kitchen to cook together and enjoy the taste of created creations are hidden.",
    image: "https://cv3.litres.ru/pub/c/cover/70480633.jpg",
    price: "1600",
  },
  {
    id: 6,
    title:
      "Recipes from the tavern for Harry Potter. Treats from Hogsmeade, The Leaky Cauldron and other magical places",
    author: "Tom Grimm",
    description:
      "Harry Potter's world is full of food! Surely each of us, when we first found ourselves with Harry in the world of wizards, looked with wide eyes at the wonderful dishes served here and there. Amazing sweets on the Hogwarts Express, dizzying feasts at Hogwarts, a variety of dishes and insidious drinks at the Leaky Cauldron, Boar's Head and Three Brooms... Now we, simple Muggles, can try all this!",
    image: "https://cdn.eksmo.ru/v2/ITD000000001350395/COVER/cover1__w600.jpg ",
    price: "1900",
  },
  {
    id: 7,
    title:
      "A delicious post. More than 60 recipes that you will cook even after fasting",
    author: "Olga Voynova",
    description:
      "What should a lean meal be like? Delicious and satisfying, and also varied. These rules have long been adhered to by Olga Voynova, author of the bestseller 'Artisan bread and Sourdough muffin'. In the new book, she shares with an open mind not only recipes for delicious lean dishes, but also reveals the secrets of how to make each of them even more diverse. Therefore, there will be enough ideas for a long time!",
    image: "https://s1-goods.ozstatic.by/1000/470/306/101/101306470_0.jpg ",
    price: "1235",
  },
  {
    id: 9,
    title:
      "The taste of morning. Beautiful breakfasts for weekdays and leisurely weekends",
    author: "Masha Shelushenko",
    description:
      'Masha Shelushenko is a cook, pastry chef, popular food blogger and author of the books Living is delicious. Cooking at home, like in a restaurant" and "Cake designer. 50 ways to assemble your cake." In her books, Masha helps readers learn how to cook delicious and restaurant-style beautiful dishes right in their home kitchen.',
    image:
      "https://cdn.eksmo.ru/v2/ITD000000000873446/COVER/cover1__w820.webp ",
    price: "700",
  },
  {
    id: 10,
    title: "Encyclopedia of French pastries",
    author: "Gaston Lenotre",
    description:
      'The world-famous "House of Lenotr"! Created for 25 years by the whole family of Gaston and Colette Lenotre! The result of their work is captured in this amazing book! An exciting story of the beginning and development of this confectionery house. A detailed description of the time of each cooking stage, equipment, output/result, cooking steps are not easy (French!) desserts. Important — the chef"s up-to-date notes for each dish. And 200 of the most impressive desserts, in addition to the dough and its variations, accompanying any dessert of creams, mousses and glazes: various types of brioches, croissants, muffins, tarts, cakes and, finally, world-famous cakes!',
    image: "https://ir.ozone.ru/s3/multimedia-7/wc1000/6896111479.jpg ",
    price: "756",
  },
  {
    id: 11,
    title:
      "Culinary geography. The 90 best family dinners from all over the world",
    author: "Irina Chadeeva",
    description:
      'At the mention of the word "geography", many people remember boring lessons about minerals, cramming different types of winds and filling out a contour map. Irina Chadeeva decided to give this word a new meaning! Thanks to the book "Culinary Geography" you will travel through the dishes of the whole world: starting from the Australian meat pie and ending with Canadian pancakes with maple syrup',
    image:
      "https://img3.labirint.ru/rc/fd1ad76f02a9c43107a311a46489bd6b/363x561q80/books101/1004187/cover.jpg?1707200747",
    price: "860",
  },
  {
    id: 12,
    title:
      "I choose the fish! A complete guide to choosing and cooking from a third-generation fisherman",
    author: "Svetlana Krotkova",
    description:
      "Svetlana Krotkova is the author of a blog about fish with an audience of more than 300,000 subscribers, a third—generation fisherman and just a caring person who is in love with fish and its cooking. Svetlana's book is a guide to the world of fish: from the usual mackerel and cod to exotic taimen and tuna. Svetlana shares her personal experience and gives practical advice on the selection, storage, cutting and cooking of fish. The book has recipes for dishes for every taste and occasion: for a quick dinner on weekdays, for a festive table, for cooking in nature and, of course, for special occasions.",
    image:
      "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-27/368/671/931/121/5/600016100244b0.jpg",
    price: "900",
  },
  {
    id: 13,
    title:
      "The perfect pastry chef. A step-by-step guide from simple candies to amazing cakes",
    author: "Ekaterina Mityushkina",
    description:
      "How do you become the perfect pastry chef so that the two-tiered cakes do not fall, the cream impresses with its velvety texture, and the design always turns out to be successful? The answer to these questions was given by a pastry chef with eight years of experience and a popular blogger Ekaterina Mityushkina, the author of the book 'The Perfect Pastry Chef'!",
    image: "https://cdn.eksmo.ru/v2/ITD000000001275542/COVER/cover1__w600.jpg",
    price: "1600",
  },
  {
    id: 14,
    title: "Not just breakfast",
    author: "Julia Dianova",
    description:
      "Hello, my favorite breakfast! — these are the words the author of the book Yulia Dianova advises to start your day. In the debut book of a professional pastry chef, a popular blogger, a caring mother of five children and just an energetic and charming woman, you can find everything to make the morning bright and delicious! The author is sure that when you wait for breakfast, as a meeting with a loved one, the hormone of joy is produced, and you will not gain a single gram for anything in the world! Therefore, you can have everything for breakfast! Pancakes with salmon salad, rice porridge with halva, shakshuka or a colorful Turkish breakfast? Croissant with baked peppers, pesto sauce and mozzarella or yeast pancakes with apples? Choose, cook, please yourself and your loved ones! May your morning be delicious!",
    image:
      "https://cdn.eksmo.ru/v2/ITD000000001312063/COVER/cover1__w820.webp ",
    price: "2300",
  },
  {
    id: 15,
    title: "Cheesecake inside. Complex and unusual cakes are easy!",
    author: "Victoria Melnik",
    description:
      "Create your own personal sweet story under the guidance of popular blogger Victoria Melnik (@vicky_bakery, more than 100 thousand Instagram followers).",
    image:
      "https://img2.labirint.ru/rcimg/87a52f954fcd337a3883e42abb54d7ef/960x540/books62/615728/ph_001.jpg?1686677380",
    price: "1900",
  },
  {
    id: 16,
    title:
      " A pinch of delicious memories. Simple and clear recipes for nostalgic meetings",
    author: "Evgenia Reshanova",
    description:
      "For cozy meetings with loved ones, cook Evgenia Reshanova has collected the best ideas from around the world. We will prepare chilbir eggs, saltison, sweet fish soup and minestrone, mushroom pate, homemade bread, pumpkin buns, royal cheesecake. Nostalgic recipes will not be ignored either: boiled corn, fish cutlets and chicken chops, roast beef, cottage cheese bagels, lush mannikin in a new way and sweet potatoes.Memories from childhood - vivid and colorful - will accompany us. Together with the author, we will go to a small Ural town, remember treats and children's pranks, family holidays and even a grandmother's set. The most delicious - from breakfasts to desserts!",
    image:
      "https://img3.labirint.ru/rc/ce1bf982c5c84d4007ae8c0be15f5d65/363x561q80/books101/1003717/cover.jpg?1706603105",
    price: "920",
  },
  {
    id: 17,
    title: "Breakfast first! Recipes that you will love",
    author: "Nastya Varayeti",
    description:
      "How do you like to have breakfast? Scrambled eggs? Sausages? Oatmeal? The famous food blogger Nastya Varayeti in her third book 'Breakfast First!' will teach you how to have breakfast much more interesting and useful. After all, she has prepared as many as 43 recipes — for weekdays and work trips, for leisurely weekends and luxurious holidays. They are light and more high-calorie, fast and require a little more time to cook. Sweet, salty, spicy. Nastya knows that both the mood and the success of each day depend on breakfast, so she suggests cooking Moroccan pancakes, lazy khachapuri, glazed cheeses with blueberries, dumplings with cheese and mushrooms, focaccia with parmesan, ricotniks, cottage cheese waffles and much, much more. Here everyone will find an option for their ideal breakfast. Any recipe from Nastya contains warmth and joy. After all, everything prepared for loved ones at home and with their own hands has an incomparable taste.",
    image:
      "https://cdn.eksmo.ru/v2/ITD000000000955864/COVER/cover1__w820.webp ",
    price: "890",
  },

  {
    id: 18,
    title: "Big Cookbook",
    author: "V.V.Pokhlebkin",
    description:
      "V. V. Pokhlebkin is a man who surprisingly managed to write works on Scandinavian studies, make tea blends for astronauts and create the most cited monograph on the history of cooking in the USSR. In this collection you will find outstanding works by V. V. Pokhlebkin: from 'Entertaining cooking' to 'Culinary Dictionary'. With the help of this book, you will not only learn how to cook, but also learn about the formation and development of national cuisines.",
    image: "https://cdn.eksmo.ru/v2/ITD000000000164177/COVER/cover1__w820.webp",
    price: "3900",
  },
  {
    id: 19,
    title:
      "The best desserts with reduced calories. Absolutely natural sweets for every day",
    author: "Elizaveta Romanova",
    description:
      "Despite the admonitions of nutritionists, most of us still enjoy sweets. Eksmo Publishing House has good news for sweet tooths: with the book by food blogger Elizaveta Romanova, The Best Desserts with Reduced Calories: Absolutely Natural Sweets for Every Day, you can indulge in your favorite treats without feeling guilty or worrying about your figure and health. Elizaveta has collected recipes for everyone's favorite classic cakes, pastries, glazed cheeses, ice creams, and other desserts, replacing excessively high-calorie ingredients with lighter alternatives. Don't worry—they're still delicious! Most of them are free from gluten, sugar, and butter, and contain no artificial colors or flavors. The author focuses on the protein and vitamin content, substituting butter creams and white flour with grain mixtures, and using the maximum benefits of nuts, fruits, and healthy ingredients. In this book, you will find various options for substitutions and additions, allowing you to easily replace ingredients you don't like or prefer to avoid.",
    image:
      "https://cdn.eksmo.ru/v2/ITD000000001294892/COVER/cover1__w820.webp ",
    price: "1200",
  },
  {
    id: 20,
    title: "Flowers and pastries. Inspiration to cook delicious and beautiful!",
    author: "Annelie Andersson",
    description:
      "When the author, Annelia Andersson, was asked to write this book, it was not difficult for her to agree. 'In my opinion, this is the most important thing for me — to combine my main passions in life: baking, growing flowers and photographing.' First of all, you will be captivated by the beauty of the flower arrangements in the photo. Then you will choose a bread or pie recipe and cook it first. Annelie described in detail all the preparation and cooking processes both in the introductory part (pay special attention to how to communicate with the oven) and for each recipe, respectively. And then, day after day, you will flip through the book from autumn to summer and enjoy the aromas flowing from it and the wonderful pastries created by your own hands.",
    image:
      "https://cdn.eksmo.ru/v2/ITD000000001158321/COVER/cover1__w820.webp ",
    price: "2700",
  },
  {
    id: 21,
    title: "The Big Cookbook",
    author: "V.V.Pokhlebkin",
    description:
      "V. V. Pokhlebkin is a man who surprisingly managed to write works on Scandinavian studies, make tea blends for astronauts and create the most cited monograph on the history of cooking in the USSR. In this collection you will find outstanding works by V. V. Pokhlebkin: from 'Entertaining cooking' to 'Culinary Dictionary'. With the help of this book, you will not only learn how to cook, but also learn about the formation and development of national cuisines.",
    image: "https://cdn.eksmo.ru/v2/ITD000000000164177/COVER/cover1__w820.webp",
    price: "1900",
  },
  {
    id: 22,
    title:
      "Hummingbird bakery. Sweet recipes from London's iconic pastry shop (Cupcakes)",
    author: "Tarek Malouf",
    description:
      "Wonderful miniature cupcakes, gorgeous cakes and cheesecakes, crunchy cookies and fragrant pies - just listing these treats makes your mouth water! Do you want to cook them all? In this book, you will find the best, most beloved, popular, tried-and-tested recipes for American homemade pastries - good and simple (but, of course, with a twist from Hummingbird confectioners). Author's mint-caramel cupcakes, simple and delicious cookies, impressive desserts, cozy pies - among the recipes there are classics and its modern interpretations. Pure inspiration!",
    image: "https://cdn.eksmo.ru/v2/ITD000000000920153/COVER/cover1__w820.webp",
    price: "1000",
  },
  {
    id: 23,
    title:
      "Shall we have breakfast? 62 bright ideas for the most cheerful morning",
    author: "Nina Tarasova",
    description:
      "Do you want to please yourself with bright breakfasts every day — even on a lazy Saturday, even on the busiest Tuesday, even if you overslept the alarm clock? With Nina Tarasova's book, it's very simple. Get out flour, eggs, cereals and the most important ingredient — love! There are 62 recipes waiting for you under the cover to cheerfully start the morning: pancakes and fritters, waffles, porridges, toasts, granola and smoothies for those in a hurry.",
    image:
      "https://cdn.eksmo.ru/v2/ITD000000001304642/COVER/cover1__w820.webp ",
    price: "2700",
  },
  {
    id: 24,
    title: "The taste of the sea",
    author: "Markovich S.",
    description: "The taste of the sea",
    image: "https://cdn.eksmo.ru/v2/430000000000182497/COVER/cover1__w820.jpg",
    price: "900",
  },
  {
    id: 25,
    title: "The perfect steak. Cooking from A to Z",
    author: "Alexey Onegin",
    description:
      "Hmm, what kind of dish can seriously compete with an appetizing piece of meat, fried to a golden brown on the outside and preserved the fragrant juice inside. Steak can turn any dinner into a small celebration, and the ability to masterfully cook steaks is the best way to impress friends or pave the shortest path to the heart of your passion. It is not surprising that not everyone can cook steaks well, and there is no one to learn from: even professional chefs blindly copy erroneous recipes and replicate myths that are easy to refute empirically. What should I do in this case? The best option is to go all the way yourself from buying meat to the moment you leave the finished steak to rest. Alexey Onegin literally dissected the process of getting a steak at home, put together all the nuances and pitfalls, put side dishes and sauces on the shelves so that everything worked out for you.",
    image: "https://kniga.lv/icache/b99834bc/97edbe83/93c6a49e.jpg",
    price: "1156",
  },
  {
    id: 26,
    title: "From salad to steak (formation2)",
    author: "Keda Black",
    description:
      "Perhaps every cook, beginner or experienced, should have the most necessary recipes at hand. In your hands is a book containing recipes for basic classic dishes that will never go out of fashion. With its help, you will learn how to properly cook bechamel sauce and mayonnaise, roast steak or stew lamb, surprise your loved ones with zucchini pie and trifle in Italian. And most importantly, each recipe is accompanied by detailed step-by-step instructions from photos, which will certainly make cooking easier for you and give you a pleasant time in the kitchen.",
    image: "https://cdn.eksmo.ru/v2/ITD000000000239275/COVER/cover1__w820.webp",
    price: "1700",
  },
  {
    id: 27,
    title: "Aerogrill",
    author: "",
    description:
      "Aerogrill is a modern and reliable assistant in the kitchen, replacing several devices at once. Without unnecessary hassle, you can cook almost any dish in it: from a warm grilled salad of vegetables and crumbly buckwheat porridge to stunningly appetizing ribs in honey glaze or a fragrant orange cupcake. You will find a set of the best and proven recipes for aerogrill in this book, and colorful illustrations, a step-by-step guide and useful tips from the chef will help you prepare the selected dishes.",
    image:
      "https://cdn.eksmo.ru/v2/ITD000000000189971/COVER/cover1__w820.webp ",
    price: "900",
  },
  {
    id: 28,
    title: "E-book 'Cooking in 20 minutes'",
    author: "",
    description:
      "How do you bring variety to your daily diet? How to beat the usual ingredients in a new way? What dish should I cook to really surprise my family and loved ones? It is these issues that the new series 'You are a great hostess!' is designed to solve. The series is for those who can simultaneously cook borscht and bake sour cream cake with their eyes closed. For those who just need fresh dish ideas from familiar foods and a few unexpected recipes for a special occasion. For those whose title of class hostess is indisputable and does not need proof.",
    image: "https://cdn.eksmo.ru/v2/ITDA00000000008972/COVER/cover__w820.webp",
    price: "700",
  },
  {
    id: 29,
    title: "Snacks in 30 minutes",
    author: "",
    description:
      "Make snacks in 30 minutes? Easy! With our Chef and his assistant cook, you can serve delicious and varied snacks to the table in just half an hour. Carpaccio or meatloaf, tartar or julienne - a minimum of time and you will be able to please your loved ones with delicious snacks!",
    image:
      "https://cdn.eksmo.ru/v2/ITD000000000221822/COVER/cover1__w820.webp ",
    price: "1900",
  },
];

const BooksPage = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Сброс страницы при новом поиске
  const [searchTerm, setSearchTerm] = useState("");
  const booksPerPage = 8;
  const { addProductToCart, checkProductInCart, deleteProductFromCart } =
    useCart();
  const handleDelete = (book) => {
    deleteProductFromCart(book.id);
  };

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/564x/8b/29/7c/8b297c88c8dfd2e771099ae7cb7e0f1c.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        backgroundColor: "#f0f0f0",
        padding: "20px",
      }}
    >
      <Container>
        <Typography
          variant="h3"
          gutterBottom
          style={{
            color: "#f26a8d",
            marginBottom: "20px",
            marginTop: "90px",
            textAlign: "center",
            textShadow: "2px 2px 5px rgba(0,0,0,0.9)",
            fontWeight: "bold",
            fontFamily: "Snell Roundhand, cursive",
          }}
        >
          Cooking recipes of books
        </Typography>

        <TextField
          label="Book Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            marginBottom: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        />
        <Grid container spacing={3}>
          {currentBooks.map((book, index) => (
            <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
              <Grow in timeout={(index + 1) * 300}>
                <Card
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "transform 0.3s ease-in-out",
                    borderRadius: "35px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onClick={() => openModal(book)}
                >
                  <img
                    src={book.image}
                    alt="Обложка книги"
                    style={{
                      width: "100%",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography variant="h6" style={{ fontSize: "18px" }}>
                      {book.title}
                    </Typography>
                    <Typography
                      fontSize="24px"
                      fontWeight={200}
                      style={{ color: "#2a9d8f" }}
                    >
                      {book.price}kgs
                    </Typography>
                    <Stack direction="row">
                      <AddShoppingCartIcon
                        sx={{
                          color: checkProductInCart(book.id)
                            ? "red"
                            : "inherit",
                        }}
                        onClick={() => addProductToCart(book)}
                      >
                        <Favorite />
                      </AddShoppingCartIcon>
                    </Stack>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          mt={3}
          style={{ marginTop: "20px" }}
        >
          <Pagination
            count={Math.ceil(filteredBooks.length / booksPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Container>

      <Modal
        open={selectedBook !== null}
        onClose={closeModal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 4,
            borderRadius: "8px",
            width: "80%",
            maxWidth: "600px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {selectedBook && (
            <>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  textAlign: "center",
                  color: "#c9184a",
                  fontFamily: "cursive",
                }}
              >
                {selectedBook.title}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  fontSize: "18px",
                  color: "#ff4d6d",
                  marginBottom: "10px",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Author: {selectedBook.author}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  whiteSpace: "pre-line",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  textAlign: "justify",
                }}
              >
                Description: {selectedBook.description}
              </Typography>
              <img
                src={selectedBook.image}
                alt="Обложка книги"
                style={{ width: "100%", height: "auto", marginTop: "20px" }}
              />
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BooksPage;
//
