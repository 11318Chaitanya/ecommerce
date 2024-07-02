import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../../Utils/localStorage";
import { useState, useEffect } from "react";

const HeartIcon = ({product}) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useState(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorite = ()=>{
    if(isFavorite){
      dispatch(removeFavorites(product));

      removeFavoriteFromLocalStorage(product._id);
    }
    else{
      dispatch(addToFavorites(product));

      addFavoriteToLocalStorage(product);
    }
  }

  return (
    <div className="absolute top-2 right-5 cursor-pointer" onClick={toggleFavorite}>
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default HeartIcon;
