# hijri-gregorian-date-picker

# React Hijri Gregorian DatePicker
A simple and reusble react component for Both hijiri and gregorian date picker.

# If you want a `standalone` web component take a look at [hijri-gregorian-date-picker](https://github.com/omarjomai/hijri-gregorian-date-picker)

# Installation
The package can be installed using npm, this package requires you to install *moment-hijri*, *react-popper*, *react-onclickoutside* and *styled_components*
```
npm i hijri-gregorian-date-picker
```
# Usage
### Example 1: npm installation
```javascript
import React from  'react';
import ReactDOM from  'react-dom';
import HijriGregorianDatePicker from 'hijri-gregorian-date-picker';

ReactDOM.render(<HijriGregorianDatePicker placeholder="hijri_gregorian_date" className="form-control" selectedDate="1440/09/05"  />, document.getElementById('root'));

```
