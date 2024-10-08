const noroffLoginUrl = "https://api.noroff.dev/api/v1/auction/auth/login";
const noroffRegisterUrl = "https://api.noroff.dev/api/v1/auction/auth/register";
const noroffProfileUrl = "https://api.noroff.dev/api/v1/auction/profiles/";
const noroffListingsUrl = "https://api.noroff.dev/api/v1/auction/listings/";

/**
 * Modular function to login a user using Noroff API
 * @param {user} user the user information for the login
 * @returns {Promise<Response>} API response of the login attempt
 */
async function loginUser(user) {
  const response = await fetch(noroffLoginUrl, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response;
}

/**
 * Modular function to register a new user using Noroff API
 * @param {user} user the user information for the registration
 * @returns {string} API response of the registration attempt
 */
async function registerUser(user) {
  const response = await fetch(noroffRegisterUrl, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response;
}

/**
 * Modular function to retrive the profile information (including posts, followers, and following) of a given user using Noroff API
 * @param {string} username the username of the profile to be retrieved
 * @param {string} token the JWT token of the user currently logged in
 * @returns {string} API response of the GET profile attempt
 */
async function profileInfo(username, token) {
  const response = await fetch(
    noroffProfileUrl + username + "?_listings=true",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
}

/**
 * Modular function to retrive the profile information (including posts, followers, and following) of a given user using Noroff API
 * @param {string} username the username of the profile to be retrieved
 * @param {string} token the JWT token of the user currently logged in
 * @returns {string} API response of the GET profile attempt
 */
async function profileBids(username, token) {
  const response = await fetch(
    noroffProfileUrl + username + "/bids?_listings=true",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
}

/**
 * Modular function to delete a given post using Noroff API
 * @param {string} id the identifier of the post
 * @param {string} token the JWT token of the user currently logged in
 * @returns {string} API response of the DELETE post attempt
 */
async function listingDelete(id, token) {
  const response = await fetch(noroffListingsUrl + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

/**
 * Modular function to get a given post using Noroff API
 * @param {string} id the identifier of the post
 * @param {string} active whether to fetch active listings
 * @param {string} sortOrder the order to sort the listings
 * @param {number} offset the offset for pagination
 * @returns {Promise<Response>} API response of the GET post attempt
 */
async function listingGet(id, active, sortOrder, offset) {
  const queryParams = new URLSearchParams({
    _seller: "true",
    _bids: "true",
    _active: active,
    sortOrder: sortOrder,
    limit: "100",
    offset: offset
  });
  
  const response = await fetch(
    `${noroffListingsUrl}${id}?${queryParams.toString()}`,
    {
      method: "GET",
    }
  );
  return response;
}

/**
 * Modular function to update a given post using Noroff API
 * @param {string} id the identifier of the post
 * @param {string} token the JWT token of the user currently logged in
 * @returns {string} API response of the PUT post attempt to update a post
 */
async function listingEdit(id, token) {
  let response;
  if (document.getElementById("postMedia").value == "") {
    response = await fetch(noroffListingsUrl + id, {
      method: "PUT",
      body: JSON.stringify({
        title: document.getElementById("postTitle").value,
        description: document.getElementById("postBody").value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    response = await fetch(noroffListingsUrl + id, {
      method: "PUT",
      body: JSON.stringify({
        title: document.getElementById("postTitle").value,
        description: document.getElementById("postBody").value,
        media: document.getElementById("postMedia").value.split(","),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return response;
}

/**
 * Modular function to update a given post using Noroff API
 * @param {string} id the identifier of the post
 * @param {string} token the JWT token of the user currently logged in
 * @returns {string} API response of the PUT post attempt to update a post
 */
async function bidSubmit(id, token) {
  const response = await fetch(noroffListingsUrl + id + "/bids", {
    method: "POST",
    body: JSON.stringify({
      amount: Number(document.getElementById("bidAmount").value),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

/**
 * Modular function to add a new post using Noroff API
 * @param {string} token the JWT token of the user currently logged in
 * @returns {string} API response of the POST a new post attempt
 */
async function listingNew(token) {
  let response;
  if (document.getElementById("postMedia").value == "") {
    response = await fetch(noroffListingsUrl, {
      method: "POST",
      body: JSON.stringify({
        title: document.getElementById("postTitle").value,
        description: document.getElementById("postBody").value,
        endsAt: new Date(document.getElementById("postDate").value),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    response = await fetch(noroffListingsUrl, {
      method: "POST",
      body: JSON.stringify({
        title: document.getElementById("postTitle").value,
        description: document.getElementById("postBody").value,
        media: document.getElementById("postMedia").value.split(","),
        endsAt: new Date(document.getElementById("postDate").value),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return response;
}

/**
 * Modular function to update a given user avatar using Noroff API
 * @param {string} url the identifier of the new image
 * @param {string} username the identifier of the user
 * @returns {string} API response of the PUT post attempt to update a post
 */
async function avatarUpdate(url, username, token) {
  const response = await fetch(noroffProfileUrl + username + "/media", {
    method: "PUT",
    body: JSON.stringify({
      avatar: url,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export {
  loginUser,
  registerUser,
  profileInfo,
  profileBids,
  listingDelete,
  listingGet,
  listingEdit,
  listingNew,
  bidSubmit,
  avatarUpdate,
};
