https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html

Capsule project

Node used: v8 LTS
TFS - Microsoft Team Foundation Server
-private npm repositort (nuget)

Task -> email the design to Pierre & Paul
Pierre - Team Lead
Paul - Developer

If design is approved
-start implementing design
-write unit tests
-review code against project coding standards
-create pull request
-fix issue ( if there are any)

Project Repository structures:
-master
--develop
..

Project structure modules:
-App
--Core
---Dashboard
---Hubs (lazy loaded)

Requirement to able merge branch to develop
-2 approvals
-all comments resolved
-build passing status
-linked workitems

imports sorter
Ctrl+ Alt + o

State management need to learn

- ngrx/store(Redux equivalent)
