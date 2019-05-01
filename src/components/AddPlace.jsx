import React from 'react';

export default class AddPlace extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let form = document.forms.placeAdd;
        this.props.createPlace({
            name: form.name.value,
            price: form.price.value,
            distance: form.distance.value,
            numberOfPeople: form.numberOfPeople.value,
            activityLvl: form.activityLvl.value,
        });
        // Clear the form for the next input.
        form.name.value = '';
        form.price.value = '';
        form.distance.value = '';
        form.numberOfPeople.value = '';
        form.activityLvl.value = '';
    }

    render() {
        return (
            <div>
                <form name="placeAdd" onSubmit={this.handleSubmit}>
                    <input type="text" name="name" placeholder="Name" />
                    <input type="text" name="price" placeholder="Price" />
                    <input type="text" name="distance" placeholder="Distance" />
                    <input type="text" name="numberOfPeople" placeholder="Number of People" />
                    <input type="text" name="activityLvl" placeholder="Activity Level" />
                    <button>Add</button>
                </form>
            </div>
        );
    }
}
