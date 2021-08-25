import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormComponent extends Component {
  @tracked city = '';
  @tracked icon = {};
  @tracked data = {};

  @action handleSubmit(e){
    e.preventDefault();
  }

  @action async update(e) {
    this.city = e.target.value;
    let response = await fetch("http://api.weatherapi.com/v1/current.json?key=f8dafc0bda574e0bb4d154724201308&q=" + this.city);
    let parsed = await response.json();
    let {location, current} = parsed;
    this.data = {
    City : location.name,
    State : location.region,
    Country : location.country,
    Time : location.localtime,
    Time_Zone: location.tz_id,
    "Temp(°C)": current.temp_c,
    "Wind_Speed(kph)": current.wind_kph,
    Direction : current.wind_dir,
    "Humidity(%)": current.humidity,
    "Feels_Like(°C)": current.feelslike_c,
    Condition: current.condition.text,
    }
    this.icon = {
      icon: current.condition.icon
    }
    console.log(this.data);
  }


}
