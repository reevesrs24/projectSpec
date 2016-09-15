<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Auth;

class WireframesController extends Controller {


    public function getWireframes(Request $request)
    {

        $wireframes = array();


            if ($request->app_type == "webAndMobile") {

                $wireframes = DB::table('wireframes')->select('*')
                                                     ->where('app_type', '=', 'web')
                                                     ->orWhere('app_type', '=', 'mobile')
                                                     ->get();
                return response()->json($wireframes);
            }

            $wireframes = DB::table('wireframes')->select('*')
                                                 ->where('app_type', $request->app_type)
                                                 ->get();
            return response()->json($wireframes);


    }

    public function searchWireframes(Request $request)
    {

        $wireframes = array();

        $thisHere = $request->search . '%';

        if ($request->type == "webAndMobile") {

            $wireframes = DB::table('wireframes')->select('*')
                ->where('name', 'like', $thisHere)
                ->get();
        } else {

            $wireframes = DB::table('wireframes')->select('*')
                ->where('name', 'like', $thisHere)
                ->where('app_type', $request->type)
                ->get();
        }


        $size = sizeof($wireframes);

        if ($size > 0) {
            //$wireframes['success'] = true;
            //$wireframes['message'] = "Matches found";
            return response()->json($wireframes);
        }
        else {
            $wireframes['success'] = false;
            $wireframes['message'] = "No matches";
            return response()->json($wireframes);
        }

    }

    public function getWireframeByName(Request $request)
    {
        $wireframes = array();

        if ($request->type == "webAndMobile") {

            if ($request->name == ".png") {
                $wireframes = DB::table('wireframes')->select('*')
                                                     ->where('app_type', 'mobile')
                                                     ->orWhere('app_type', 'web')
                                                     ->get();
            } else {
                $wireframes = DB::table('wireframes')->select('*')
                                                     ->where('name', $request->name)
                                                     ->get();
            }

        } else {

            if ($request->name == ".png") {

                $wireframes = DB::table('wireframes')->select('*')
                                                     ->where('app_type', $request->type)
                                                     ->get();
            } else {

                $wireframes = DB::table('wireframes')->select('*')
                                                     ->where('name', $request->name)
                                                     ->where('app_type', $request->type)
                                                     ->get();
            }

        }


        return response()->json($wireframes);

    }




}