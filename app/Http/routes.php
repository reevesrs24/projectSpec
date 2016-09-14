<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/get-started', function () {
    return view('get-started');
});

Route::group(['prefix' => 'api'], function()
{

    Route::post('getWireframes', 'WireframesController@getWireframes');
    Route::post('searchWireframes', 'WireframesController@searchWireframes');
    Route::post('getWireframeByName', 'WireframesController@getWireframeByName');

});