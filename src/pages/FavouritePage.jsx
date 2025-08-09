import React from 'react';
import MotionFadeIn from '../components/UI/MotionFadeIn';
import FavouritesCards from '../components/Favourites Sections/FavouritesCards';

export default function FavoritePage() {
    return (
        <MotionFadeIn>
            <FavouritesCards />
        </MotionFadeIn>
    );
}
