# 系统展示
**首页展示**
![Image](https://github.com/XJHSYMON/MaCao-Drone-delivery-system/blob/master/img/demo01.png)
**无人机配送页展示**
![Image](https://github.com/XJHSYMON/MaCao-Drone-delivery-system/blob/master/img/layout.png)
**无人机状态页展示**
![Image](https://github.com/XJHSYMON/MaCao-Drone-delivery-system/blob/master/img/demo02.png)
**无人机站状态页展示**
![Image](https://github.com/XJHSYMON/MaCao-Drone-delivery-system/blob/master/img/demo03.png)
**人员管理**
![Image](https://github.com/XJHSYMON/MaCao-Drone-delivery-system/blob/master/img/demo04.png)

**Dijkstra算法实现无人机路径规划**
# RRT* Smart Path Planning Algorithm

This Python implementation of the **RRT\* Smart** algorithm is designed for motion planning in environments with obstacles. It includes path optimization and beacon updating.

## Code Implementation

```python
import numpy as np
import math
import random
import matplotlib.pyplot as plt

class Node:
    def __init__(self, n):
        self.x = n[0]
        self.y = n[1]
        self.parent = None

class RrtStarSmart:
    def __init__(self, x_start, x_goal, step_len,
                 goal_sample_rate, search_radius, iter_max):
        self.x_start = Node(x_start)
        self.x_goal = Node(x_goal)
        self.step_len = step_len
        self.goal_sample_rate = goal_sample_rate
        self.search_radius = search_radius
        self.iter_max = iter_max

        self.env = env.Env()
        self.plotting = plotting.Plotting(x_start, x_goal)
        self.utils = utils.Utils()

        self.fig, self.ax = plt.subplots()
        self.delta = self.utils.delta
        self.x_range = self.env.x_range
        self.y_range = self.env.y_range
        self.obs_circle = self.env.obs_circle
        self.obs_rectangle = self.env.obs_rectangle
        self.obs_boundary = self.env.obs_boundary

        self.V = [self.x_start]
        self.beacons = []
        self.beacons_radius = 2
        self.direct_cost_old = np.inf
        self.obs_vertex = self.utils.get_obs_vertex()
        self.path = None

    def planning(self):
        n = 0
        b = 2
        InitPathFlag = False
        self.ReformObsVertex()

        for k in range(self.iter_max):
            if k % 200 == 0:
                print(k)

            if (k - n) % b == 0 and len(self.beacons) > 0:
                x_rand = self.Sample(self.beacons)
            else:
                x_rand = self.Sample()

            x_nearest = self.Nearest(self.V, x_rand)
            x_new = self.Steer(x_nearest, x_rand)

            if x_new and not self.utils.is_collision(x_nearest, x_new):
                X_near = self.Near(self.V, x_new)
                self.V.append(x_new)

                if X_near:
                    # Choose parent
                    cost_list = [self.Cost(x_near) + self.Line(x_near, x_new) for x_near in X_near]
                    x_new.parent = X_near[int(np.argmin(cost_list))]

                    # Rewire
                    c_min = self.Cost(x_new)
                    for x_near in X_near:
                        c_near = self.Cost(x_near)
                        c_new = c_min + self.Line(x_new, x_near)
                        if c_new < c_near:
                            x_near.parent = x_new

                if not InitPathFlag and self.InitialPathFound(x_new):
                    InitPathFlag = True
                    n = k

                if InitPathFlag:
                    self.PathOptimization(x_new)
                if k % 5 == 0:
                    self.animation()

        self.path = self.ExtractPath()
        self.animation()
        plt.plot([x for x, _ in self.path], [y for _, y in self.path], '-r')
        plt.pause(0.01)
        plt.show()

    def PathOptimization(self, node):
        direct_cost_new = 0.0
        node_end = self.x_goal

        while node.parent:
            node_parent = node.parent
            if not self.utils.is_collision(node_parent, node_end):
                node_end.parent = node_parent
            else:
                direct_cost_new += self.Line(node, node_end)
                node_end = node

            node = node_parent

        if direct_cost_new < self.direct_cost_old:
            self.direct_cost_old = direct_cost_new
            self.UpdateBeacons()

    def UpdateBeacons(self):
        node = self.x_goal
        beacons = []

        while node.parent:
            near_vertex = [v for v in self.obs_vertex
                           if (node.x - v[0]) ** 2 + (node.y - v[1]) ** 2 < 9]
            if len(near_vertex) > 0:
                for v in near_vertex:
                    beacons.append(v)

            node = node.parent

        self.beacons = beacons

    def ReformObsVertex(self):
        obs_vertex = []

        for obs in self.obs_vertex:
            for vertex in obs:
                obs_vertex.append(vertex)

        self.obs_vertex = obs_vertex

    def Steer(self, x_start, x_goal):
        dist, theta = self.get_distance_and_angle(x_start, x_goal)
        dist = min(self.step_len, dist)
        node_new = Node((x_start.x + dist * math.cos(theta),
                         x_start.y + dist * math.sin(theta)))
        node_new.parent = x_start

        return node_new

    def Near(self, nodelist, node):
        n = len(self.V) + 1
        r = 50 * math.sqrt((math.log(n) / n))

        dist_table = [(nd.x - node.x) ** 2 + (nd.y - node.y) ** 2 for nd in nodelist]
        X_near = [nodelist[ind] for ind in range(len(dist_table)) if dist_table[ind] <= r ** 2 and
                  not self.utils.is_collision(node, nodelist[ind])]

        return X_near

    def Sample(self, goal=None):
        if goal is None:
            delta = self.utils.delta
            goal_sample_rate = self.goal_sample_rate

            if np.random.random() > goal_sample_rate:
                return Node((np.random.uniform(self.x_range[0] + delta, self.x_range[1] - delta),
                             np.random.uniform(self.y_range[0] + delta, self.y_range[1] - delta)))
            return self.x_goal
        else:
            R = self.beacons_radius
            r = random.uniform(0, R)
            theta = random.uniform(0, 2 * math.pi)
            ind = random.randint(0, len(goal) - 1)

            return Node((goal[ind][0] + r * math.cos(theta),
                         goal[ind][1] + r * math.sin(theta)))

    def SampleFreeSpace(self):
        delta = self.delta

        if np.random.random() > self.goal_sample_rate:
            return Node((np.random.uniform(self.x_range[0] + delta, self.x_range[1] - delta),
                         np.random.uniform(self.y_range[0] + delta, self.y_range[1] - delta)))
        return self.x_goal

# [Vue Material Dashboard 2 PRO](http://demos.creative-tim.com/vue-material-dashboard-2-pro/#/?ref=readme-vmd2p) [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?url=https://www.creative-tim.com/product/vue-material-dashboard-2-pro&text=Check%20Vue%20Material%20Dashboard%202%20Pro%20made%20by%20@CreativeTim%20#webdesign%20#dashboard%20#materialdesign%20#vue%20https://www.creative-tim.com/product/vue-material-dashboard-pro)

![version](https://img.shields.io/badge/version-3.0.0-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/creativetimofficial/ct-vue-material-dashboard-2-pro.svg)](https://github.com/creativetimofficial/ct-vue-material-dashboard-2-pro/issues?q=is%3Aopen+is%3Aissue) [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/creativetimofficial/ct-vue-material-dashboard-2-pro.svg)](https://github.com/creativetimofficial/ct-vue-material-dashboard-2-pro/issues?q=is%3Aissue+is%3Aclosed)

![Image](https://s3.amazonaws.com/creativetim_bucket/products/595/original/vue-material-dashboard-pro.jpg)

Vue Material Dashboard 2 PRO is our newest premium Admin Template based on Vue3 & Bootstrap5. If you’re a developer looking to create an admin dashboard that is developer-friendly, rich with features, and highly customisable, here is your match. Our innovative Vue3 & Bootstrap5 dashboard comes with a beautiful design inspired by Google's Material Design and it will help you create stunning websites & web apps to delight your clients

**Fully Coded Elements**

Vue Material Dashboard 2 PRO is built with over 100 frontend individual elements, like buttons, inputs, navbars, nav tabs, cards, or alerts, giving you the freedom of choosing and combining. All components can take variations in color, which you can easily modify using sass files. You will save a lot of time going from prototyping to full-functional code because all elements are implemented.

This Premium Vue3 & Bootstrap5 Dashboard is coming with prebuilt design blocks, so the development process is seamless,
switching from our pages to the real website is very easy to be done.

View [all components here](https://www.creative-tim.com/learning-lab/vue/alerts/material-dashboard/).

**Documentation built by Developers**

Each element is well presented in very complex documentation.

You can read more about the [documentation here](https://www.creative-tim.com/learning-lab/vue/overview/material-dashboard/).

**Example Pages**

If you want to get inspiration or just show something directly to your clients, you can jump-start your development with our pre-built example pages. You will be able to quickly set up the basic structure for your web project.

View [example pages here](https://demos.creative-tim.com/vue-material-dashboard-2-pro/#/).

**HELPFUL LINKS**

- View [Github Repository](https://github.com/creativetimofficial/ct-vue-material-dashboard-2-pro)
- Check [FAQ Page](https://www.creative-tim.com/faq)

#### Special thanks

During the development of this dashboard, we have used many existing resources from awesome developers. We want to thank them for providing their tools open source:

- [noUISlider](https://refreshless.com/nouislider/) - JavaScript Range Slider
- [Popper.js](https://popper.js.org/) - Kickass library used to manage poppers
- [Flatpickr](https://flatpickr.js.org/) - Useful library used to select date
- [Choices JS](https://joshuajohnson.co.uk/Choices/) - A nice plugin that select elements with intuitive multiselection and searching but also for managing tags.
- [CountUp JS](https://inorganik.github.io/countUp.js/) - A dependency-free, lightweight JavaScript class that can be used to quickly create animations that display numerical data in a more interesting way.
- [Charts Js](https://www.chartjs.org/) - Simple yet flexible JavaScript charting for designers & developers
- [FullCalendar](https://fullcalendar.io/) - Full-sized drag & drop event calendar
- [Dropzone](https://www.dropzonejs.com/) - An open source library that provides drag’n’drop file uploads with image previews.
- [Datatables](https://github.com/fiduswriter/Simple-DataTables) - DataTables but in Vanilla ES2018 JS
- [jKanban](http://www.riccardotartaglia.it/jkanban/) - Pure agnostic Javascript plugin for Kanban boards
- [PhotoSwipe](https://photoswipe.com/) - JavaScript image gallery for mobile and desktop, modular, framework independent
- [Quill](https://quilljs.com/) - A free, open source WYSIWYG editor built for the modern web
- [Wizard](https://www.cssscript.com/multi-step-form-bootstrap/) - Animated Multi-step form for Bootstrap
- [Nepcha Analytics](https://nepcha.com?ref=readme) for the analytics tool. Nepcha is already integrated with Vue Material Dashboard 2 PRO You can use it to gain insights into your sources of traffic.

Let us know your thoughts below. And good luck with development!

## Table of Contents

- [Versions](#versions)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [File Structure](#file-structure)
- [Browser Support](#browser-support)
- [Resources](#resources)
- [Reporting Issues](#reporting-issues)
- [Technical Support or Questions](#technical-support-or-questions)
- [Licensing](#licensing)
- [Useful Links](#useful-links)

## Versions

[<img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue-logo.jpg?raw=true" width="60" height="60" />](https://www.creative-tim.com/product/vue-material-dashboard-2-pro?ref=readme-vmd2p)

| VueJS |
| ----- |

| [![Vue Material Dashboard 2 PRO](https://s3.amazonaws.com/creativetim_bucket/products/595/thumb/vue-material-dashboard-pro.jpg)](http://demos.creative-tim.com/vue-material-dashboard-2-pro/?ref=readme-vmd2p)

## Demo

- [Dashboard](http://demos.creative-tim.com/vue-material-dashboard-2-pro/#/dashboards/dashboard-default?ref=readme-vmd2p)
- [Sales](http://demos.creative-tim.com/vue-material-dashboard-2-pro/#/dashboards/sales?ref=readme-vmd2p)
- [Profile](https://demos.creative-tim.com/vue-material-dashboard-2-pro/#/pages/profile/overview?ref=readme-vmd2p)
- [Account](https://demos.creative-tim.com/vue-material-dashboard-2-pro/#/pages/account/settings?ref=readme-vmd2p)
- [RTL](https://demos.creative-tim.com/vue-material-dashboard-2-pro/#/pages/rtl-page?ref=readme-vmd2p)
- [Applications](https://demos.creative-tim.com/vue-material-dashboard-2-pro/#/applications/kanban?ref=readme-vmd2p)
- [Ecommerce](https://demos.creative-tim.com/vue-material-dashboard-2-pro/#/ecommerce/products/product-page?ref=readme-vmd2p)
- [Sign In](https://demos.creative-tim.com/vue-material-dashboard-2-pro/#/authentication/signin/basic?ref=readme-vmd2p)
- [Sign Up](https://demos.creative-tim.com/vue-material-dashboard-2-pro/#/authentication/signup/cover?ref=readme-vmd2p)

[View More](https://demos.creative-tim.com/vue-material-dashboard-2-pro/#/dashboards/dashboard-default?ref=readme-vmd2p).

## Quick start

Quick start options:

- Buy from [Creative Tim](https://www.creative-tim.com/product/vue-material-dashboard-2-pro?ref=readme-vmd2p).

## Terminal Commands

1. Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
2. Navigate to the root ./ directory of the product and run `yarn install` or `npm install` to install our local dependencies.

## Documentation

The documentation for the Material Dashboard is hosted at our [website](https://www.creative-tim.com/learning-lab/vue/overview/material-dashboard/?ref=readme-vmd2p).

### What's included

Within the download you'll find the following directories and files:

```
vue-material-dashboard-2-pro
    ├── public
    │   ├── favicon.png
    │   └── index.html
    ├── src
    │   ├── assets
    │   │   ├── css
    │   │   ├── fonts
    │   │   ├── img
    │   │   ├── js
    │   │   └── scss
    │   ├── components
    │   │   ├── MaterialAlert.vue
    │   │   ├── MaterialAvatar.vue
    │   │   ├── MaterialBadge.vue
    │   │   ├── MaterialButton.vue
    │   │   ├── MaterialCheckbox.vue
    │   │   ├── MaterialInput.vue
    │   │   ├── MaterialPagination.vue
    │   │   ├── MaterialProgress.vue
    │   │   ├── MaterialRadio.vue
    │   │   ├── MaterialSnackbar.vue
    │   │   ├── MaterialSocialButton.vue
    │   │   ├── MaterialSwitch.vue
    │   │   └── MaterialTextarea.vue
    │   ├── examples
    │   │   ├── Cards
    │   │   ├── Charts
    │   │   ├── Navbars
    │   │   ├── PageLayout
    │   │   ├── Sidenav
    │   │   ├── Breadcrumbs.vue
    │   │   ├── Calendar.vue
    │   │   ├── Configurator.vue
    │   │   └── Footer.vue
    │   ├── router
    │   ├── store
    │   ├── views
    │   │   ├── applications
    │   │   ├── auth
    │   │   ├── dashboards
    │   │   ├── ecommerce
    │   │   ├── pages
    │   │   └── Home.vue
    │   ├── App.vue
    │   ├── main.js
    │   └── material-dashboard.js
    ├── .browserslistrc
    ├── .eslintrc.js
    ├── .gitignore
    ├── babel.config.json
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLATE.md
    ├── package.json
    └── README.md
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

## Resources

- [Live Preview](https://demos.creative-tim.com/vue-material-dashboard-2-pro/#/?ref=readme-vmd2p)
- [Buy Page](https://www.creative-tim.com/product/vue-material-dashboard-2-pro?ref=readme-vmd2p)
- Documentation is [here](https://www.creative-tim.com/learning-lab/vue/overview/material-dashboard/?ref=readme-vmd2p)
- [License Agreement](https://www.creative-tim.com/license?ref=readme-vmd2p)
- [Support](https://www.creative-tim.com/contact-us?ref=readme-vmd2p)
- Issues: [Github Issues Page](https://github.com/creativetimofficial/ct-vue-material-dashboard-2-pro/issues)
- [Nepcha Analytics](https://nepcha.com?ref=readme) - Analytics tool for your website

## Reporting Issues

We use GitHub Issues as the official bug tracker for the Vue Material Dashboard 2 PRO. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Vue Material Dashboard 2 PRO. Check the CHANGELOG from your dashboard on our [website](https://www.creative-tim.com/product/vue-material-dashboard-2-pro?ref=readme-vmd2p).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions

If you have questions or need help integrating the product please [contact us](https://www.creative-tim.com/contact-us?ref=readme-vmd2p) instead of opening an issue.

## Licensing

- Copyright 2022 [Creative Tim](https://www.creative-tim.com?ref=readme-vmd2p)
- Creative Tim [license](https://www.creative-tim.com/license?ref=readme-vmd2p)

## Useful Links

- [More products](https://www.creative-tim.com/templates?ref=readme-vmd2p) from Creative Tim

- [Tutorials](https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w)

- [Freebies](https://www.creative-tim.com/bootstrap-themes/free?ref=readme-vmd2p) from Creative Tim

- [Affiliate Program](https://www.creative-tim.com/affiliates/new?ref=readme-vmd2p) (earn money)

##### Social Media

Twitter: <https://twitter.com/CreativeTim>

Facebook: <https://www.facebook.com/CreativeTim>

Dribbble: <https://dribbble.com/creativetim>

Google+: <https://plus.google.com/+CreativetimPage>

Instagram: <https://instagram.com/creativetimofficial>
