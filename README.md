# select-search 1.0

## Installation

### Step 1: Link required files

First and most important, the jQuery library needs to be included (no need to download - link directly from Google). Next, download the package from this site and link the bxSlider CSS file (for the theme) and the bxSlider Javascript file.

```html
<!-- jQuery library (served from Google) -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- select search Javascript file -->
<script src="/js/selectker.js"></script>
<!-- select search CSS file -->
<link href="/css/selectker.css" rel="stylesheet" />
```

### Step 2: Create HTML markup

Create a `<ul class="bxslider">` element, with a `<li>` for each slide. Slides can contain images, video, or any other HTML content!

```html
<select id="selectSearchField">
    <option value="Option1">Option 1</option>
    <option value="Option2">Option 2</option>
    <option value="Option3">Option 3</option>
    <option value="Option4">Option 4</option>
</select>
```

### Step 3: Call the bxSlider

Call .addSelectSearch() on `<select id="selectSearchField">`. Note that the call must be made inside of a $(document).ready() call, or the plugin will not work!

```javascript
$(document).ready(function(){
  $('#selectSearchField').addSelectSearch();
});
```
### sample Images
![Alt text](images/select-search-field.png?raw=true "Title")