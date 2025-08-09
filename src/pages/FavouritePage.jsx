import React from 'react';
import MotionFadeIn from '../components/UI/MotionFadeIn';
import FavouritesCards from '../components/Favourites Sections/FavouritesCards';

export default function FavoritePage() {
    return (
        <MotionFadeIn>
            <title>المفضلة | مشوارك</title>
            <meta
                name="description"
                content="اعرض المسارات والمحطات التي أضفتها إلى قائمة المفضلة لديك في مشوارك."
            />
            <FavouritesCards />
        </MotionFadeIn>
    );
}
