<?php


use Illuminate\Support\Facades\Route;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('API')->group(function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', 'AuthController@login');
        Route::post('register', 'AuthController@register');
        Route::group(['middleware' => 'check.JWT'], function () {
            Route::get('logout', 'AuthController@logout');
        });
    });
    Route::group(['prefix' => 'logs'], function () {
        Route::group(['middleware' => 'check.JWT'], function () {
            Route::post('create_user_access_log', 'UserLogController@createUserAccessLog');
            Route::post('create_account_event_log', 'UserLogController@createAccountEventLog');
        });
    });
    Route::group(['prefix' => 'admin'], function () {
        Route::group(['middleware' => 'check.JWT'], function () {
            Route::get('zones/get_zone_list', 'ZoneController@getZoneList');
            Route::apiResource('zones', 'ZoneController');
            Route::get('tags/get_tag_list', 'TagController@getTagList');
            Route::get('tags/get_tag_types', 'TagController@getTagTypes');
            Route::apiResource('tags', 'TagController');
            Route::get('tags_tree/get_tag_tree_list', 'TagTreeController@getTagTreeList');
            Route::get('tags_tree/get_tag_all_branches/{tagId}', 'TagTreeController@getTagAllBranches');
            Route::apiResource('tags_tree', 'TagTreeController');
            Route::apiResource('tags_tree.tag_aliases', 'TagAliasController');
            Route::apiResource('alias_meaning', 'AliasMeaningController');
            Route::get('channels/get_channels_list', 'ChannelController@getChannelsList');
            Route::apiResource('channels', 'ChannelController');
            Route::apiResource('experiences', 'ExperienceController');
            Route::post('save_experience_image', 'ExperienceController@saveExperienceImage');
            Route::post('delete_experience_image', 'ExperienceController@deleteExperienceImage');
            Route::get('get_experiences', 'ExperienceController@getExperiencesList');
            Route::get('get_crawler_data', 'ExperienceController@getCrawlerData');
            Route::post('find_tag_search', 'TagSearchController@findTagSearch');
            Route::get('list_tag_search', 'TagSearchController@list');
            Route::get('motives_denounces/get_motives_denounces_list', 'MotiveDenounceController@getMotiveDenounceList');
            Route::apiResource('motives_denounces', 'MotiveDenounceController');
            Route::apiResource('activities', 'ActivitieController');
            Route::apiResource('forbidden_words', 'ForbiddenWordController');
            Route::apiResource('users', 'UserController');
            Route::get('users_withProfiles', 'UserController@getUsersWithProfiles');
            Route::get('user_withProfile/{id}', 'UserController@showWithProfile');
            Route::get('user_get_all_roles', 'UserController@getRoles');
            Route::get('get_all_active_users', 'UserController@getAllActiveUsers');
            Route::post('change_password', 'UserController@changePassword');
            Route::apiResource('user_profiles', 'UserProfileController');
            Route::post('update_profile_picture', 'UserProfileController@updateProfilePicture');
        });
    });
	
	Route::group(['prefix' => 'ui'], function () {
        Route::get('zones/get_zones', 'ZoneController@getRootZones');
        Route::get('channels/get_channels', 'ChannelController@getChannelsList');
        Route::get('channels/get_channels_complete', 'ChannelController@getChanneCompleteList');
        Route::get('tags/get_tag_searches_list', 'TagSearchController@list');
        Route::get('tags/get_ten_more_usefull', 'TagController@getTenMoreUsefull');
        Route::get('check_user_email', 'FinalUserController@checkUserEmail');
        Route::post('user_manual_register', 'FinalUserController@store');
        Route::post('facebook_register', 'FinalUserController@facebookRegister');
        Route::post('user_login', 'FinalUserController@userLogin');
        Route::get('experiences/get_five_more_seen', 'FinalUserExperienceController@getFiveMoreSeen');
        Route::get('experiences/get_ordered_experiences', 'FinalUserExperienceController@getOrderedExperiences');
        Route::post('experiences/upload_main_photo', 'FinalUserExperienceController@uploadMainPhoto');
        Route::post('experiences/delete_main_photo', 'FinalUserExperienceController@deleteMainPhoto');
        Route::post('experiences/experience_body_image_upload', 'FinalUserExperienceController@experienceBodyImageUpload');
        Route::post('experiences/save_experience', 'FinalUserExperienceController@saveExperience');

        Route::get('send_email_reset_password', 'FinalUserController@sendResetPasswordEmail');

        Route::group(['middleware' => 'web'], function () {
            Route::get('auth/facebook', 'FinalUserController@redirectToFacebook')->name('social.auth.facebook');
            Route::get('auth/google', 'FinalUserController@redirectToGoogle')->name('social.auth.google');
            Route::post('update_password', 'FinalUserController@updatePassword');
        });
        Route::get('store/facebook', 'FinalUserController@facebookRegister');
        Route::get('store/google', 'FinalUserController@googleRegister');
	});
});
