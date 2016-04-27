# MVW - Model, View, Whatever! (Presentation Patterns)

## Concepts

- Different ways of implementing the Separation of Concerns (SoC) principle
- Improve the maintainability
- Improve the testability
- Reduce the complexity
- UI Code clean and manageable.
- They try to resolve issues related with
    - State / data: The current information and values of your application. The bigger the state is, the complexity of the application increases. 
    - Logic: The necessary code to handle the user actions.
    - State/View Synchronization: Usually latest data has to be presented to the User and therefore, UI needs to be periodically synchronized with business objects (Models).

## Diagrams

### Clasification

![MVW Clasification Diagram](http://goo.gl/mWUfms)

# MVC - Model, View, Controller (Traditional / SmallTalk)

## Concepts

- A combination of patterns: observer, composite, and strategy
- Request first comes to the controller
- Controllers bind models with views
- Controllers uses the strategy pattern to get a view
- Controllers modifies the models
- Logic is stored in the controllers
- Views listen to models changes and refresh accordingly
- Views only read data from models (when they are notified)
- A View can contain child views

## Diagrams

### Interactions
![MVC Traditional Interactions Diagram](https://goo.gl/MthQ00)

### Sequence
![MVC Sequence Diagram](https://goo.gl/aDQbmG)

## Roles

- Models: They manage the data for an application. They encapsulate the business tier. When a model changes (e.g when it is updated), it will typically notify its observers (e.g views) that a change has occurred so that they may react accordingly. Views use their data to display it.
- Views: They display data to user. They are the visual representation of models. The presentation tier is handled by the View. It should be simple and free of business logic implementation. View invokes methods on Controller depending on user actions. They monitor the models for any state change and refresh accordingly. Model and View interact with each other using the Observer pattern.
- Controllers: Everything starts in the controller. It uses the strategy pattern to get a View. They bind Views with Models. Views uses them to handle user actions and they usually end up updating the Model. 

## Implementations

- [Maria](http://peter.michaux.ca/maria/)

# MVC - Model, View, Controller (Web / JSP Model2 [Java])

## Concepts

- All requests go to a Front Controller, which in turn figures out the appropriate Controller depending on the structure of the incoming request.
- A method of the matched Controller is executed and this eventually modifies the Model and instantiates a View with certain data.
- The Controller invoked method could also render a View which will fire actions that will be catched by the Front Controller, starting again the whole cycle.

## Diagrams

### Interactions
![MVC Web Interactions Diagram](https://goo.gl/dMZXGc)

### Sequence
![MVC Web Sequence Diagram](https://goo.gl/Mlv2nx)

# MVP - Model, View, Presenter

## Concepts

- It attempts to clarify the boundaries between the Model, View, and the code that connects them (in MVC, this is the Controller, in MVP, this
is known as the Presenter).
- In MVC the Controller mediates between Model and the View, it doesn’t update the latest directly.
- All communication between the Model and View must go through the Presenter (In MVC, a View can be updated based on changes made in the Model directly - the View is not as passive).
- The Presenter contains all the logic to handle user actions (UI events).
- The View exposes a contract through which the Presenter interacts with the it.
- When users interact with the view, the view invokes a method on the presenter and the presenter performs the required task on the Model and then updates the View using the contract.
- The presenter requires the corresponding view, and a model
- When the presenter gets the model, it updates the view using the exposed contract
- The presenter will register handlers in the view for any UI events that require some logic.

## Diagrams

### Sequence
![MVP Sequence Diagram](https://goo.gl/NQpKSI)

## Implementations

- [Backbone](https://goo.gl/gFWB7m)

### Passive View

#### Concepts

- View is completely isolated from the model.
- The view is really passive, light weight.
- All logic of UI is stored in presenter.
- Presenter is aware of the view.
- View could or not (using events) be awared of the presenter.

#### Diagrams

##### Interactions
![MVP Passive View Interactions Diagram](https://goo.gl/TJyUVw)

### Supervising Controller/Presenter

#### Concepts

- View knows about the model.
- The View is active, it interacts directly with the Model without the intervention of the Presenter.
- The presenter is responsible for updating the model. It manipulates the view only if needed (complex logic).
- Presenter owns only the complex presentation logic.
- Presenter is aware of the view.
- View could or not (using events) be awared of the presenter.
- The Presenter listens to View changes and updates the Model accordingly.

#### Diagrams

##### Interactions
![MVP Supervising Controller Interactions Diagram](https://goo.gl/TB8dj9)

# MVVM - Model, View, View Model (Variation of PM - Presentation Model)

## Concepts

- Like MVP, it aims to completely separate the Model and View from communicating directly with each other.
- The View itself can be replaced with something much simpler and connected
(or bound) to the ViewModel via HTML5 data- attributes.
- The View is active and contains behaviors, events and data binding information.
- The View is not responsible for managing the state information, that is a task of the ViewModel.
- The viewmodel is responsible for presentation separation and exposes methods and commands to manage the state of a view and manipulate the model.
- The bi-directional databinding or the two way databinding between the View and the ViewModel ensures that the models and properties in the Viewmodel are in sync with the View.
- It allows the creation of View-specific subsets of a Model which can contain state and logic information, avoiding the need to expose the entire Model to a View.
- Unlike MVP’s Presenter, a ViewModel is not required to reference a View. The View can bind to properties on the ViewModel which in turn expose data contained in Models to the View.

## Diagrams

### Interactions
![MVVM Interactions Diagram](https://goo.gl/RULT7N)

## Roles

- Models: As with other members of the MV* family, the Model in MVVM represents domain-specific data or information that our application will be working with, or in other words, the business logic layer of the application.
- Views: It only contains the UI elements. The interaction between view and ViewModel happens using data binding.
- View Models: It encapsulates presentation logic and data for the view.  ViewModel contains the state of the view and they communicate through data binding.

## Implementations

- [Knockout](http://knockoutjs.com/)
