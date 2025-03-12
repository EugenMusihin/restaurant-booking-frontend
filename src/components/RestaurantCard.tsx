interface Restaurant {
    id: number;
    name: string;
    address: string;
    description: string;
    image_url: string;
}

interface RestaurantProps {
    restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantProps> = ({ restaurant }) => {
    return (
        <div className="restaurant-card">
            <img src={restaurant.image_url} alt={restaurant.name} />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.address}</p>
            <p>{restaurant.description}</p>
        </div>
    );
};

export default RestaurantCard;
