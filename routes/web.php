<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
// */

// Route::get('/', function () {
//     return view('welcome');
// });

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

Route::get('/admin/{any}', 'SpaController@index')->where('any', '.*');
Route::get('/admin/', 'SpaController@index')->where('any', '.*');

///<sumary>
///Rutas de UI de usuario
///</sumary>

//AUTH ROUTES
Route::get('register', 'PageController@getRegisterView');
Route::get('send-confirmation-email', 'PageController@getConfirmationEmailView');
Route::get('login', 'PageController@getLoginView');
Route::get('confirm_register', 'PageController@getConfirmedAccountView');
Route::get('callback/facebook', 'PageController@callBackFacebook');
Route::get('callback/google', 'PageController@callBackGoogle');
Route::get('reset-password-email-sent', 'PageController@getResetPasswordEmailSentView');
Route::get('recover-pass', 'PageController@getRecoverPassView');

//EXPERIENCES ROUTES
Route::get('publicar-experiencia', 'PageController@getExperiencePublishView');
Route::get('post-success', 'PageController@getExperiencePublishSuccess');

//HOME ROUTES
Route::get('/channel/{channelSlug}', 'PageController@getHomeChannel');
Route::get('/channel/{channelSlug}/tag/{tag}', 'PageController@getExperiencesByChannelAndTag');