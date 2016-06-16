SNCF API documentation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
API SNCF is based on navitia.io software, to see last update, please go to navitia.io documentation (http://doc.navitia.io/)

.. contents:: Index

OVERVIEW
========

This document describes how to use the SNCF API based on navitia via the v1 interface, and the returned resources. Navitia is an Open Source software developed by Kisio Digital (hyperlink to http://www.kisio.org/nos-expertises/#!/digital).
The SNCF API handles:

* journeys computation
* line schedules
* next departures
* exploration of public transport data / search places
* autocomplete
* isochrones

The SNCF API contains theoretical train data for the following commercial modes : TGV, TER, Transilien, Intercités.
Read our lexicon : https://github.com/OpenTransport/vocabulary/blob/master/vocabulary.md

.. _authentification:

AUTHENTICATION
==============
You must authenticate to use SNCF API. When you register we give you an authentication key to the API.
You must use the Basic HTTP authentication, where the username is the key, and without password.
Username: copy / paste your key
Password: leave the field blank

.. _easy_examples:
EASY EXAMPLES
=============
Easy executable examples are available on JSFiddle

`Try JOURNEYS feature on JSFiddle <http://jsfiddle.net/gh/get/jquery/2.2.2/SNCFdevelopers/API-trains-sncf/tree/source/examples/jsFiddle/journeys/>`_

`Try ISOCHRONES feature on JSFiddle <http://jsfiddle.net/gh/get/jquery/2.2.2/SNCFdevelopers/API-trains-sncf/tree/source/examples/jsFiddle/isochron/>`_

`Try LINES feature on JSFiddle <http://jsfiddle.net/gh/get/jquery/2.2.2/SNCFdevelopers/API-trains-sncf/tree/source/examples/jsFiddle/lines/>`_

.. _more_detail_and_examples:
MORE DETAILS AND EXAMPLES
=========================
If you need more information describing how to use SNCF API, please refer to the navitia API documentation (http://doc.navitia.io/). It contains many example, libraries and tools that will help you build your project using the API.

`VIEW THE FULL NAVITIA DOCUMENTATION <http://doc.navitia.io/>`_

Important note : The Navitia documentation describes the Navitia API. All the examples that it contains refer to this API. Since it is based on the same technology, do not forget to change the first part of the URL in order to call the right API
Here is an example :

======================================== ===========================================
If the documentation shows this request       try this one !
======================================== ===========================================
https://api.navitia.io/v1/coverage            https://api.sncf.com/v1/coverage
======================================== ===========================================
