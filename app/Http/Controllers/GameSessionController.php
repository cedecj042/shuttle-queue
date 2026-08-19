<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameSessionResource;
use App\Models\GameSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameSessionController extends Controller
{
    public function index(){
        $sessions = GameSession::withCount('players')->get();

        return Inertia::render('GameSessions/Index', [
            'sessions' => $sessions
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'session_name' => 'required|string|max:255',
            'status' => 'required|string|in:active,inactive',
            'session_date' => 'required|date',
        ]);

        GameSession::create($validated);

        return redirect()->route('sessions.index')->with('success', 'Game session created successfully.');
    }

    public function show(GameSession $session){
        
        $session->load(['matches','players']);

        return Inertia::render('GameSessions/Show', [
            'session' => GameSessionResource::make($session)
        ]);
    }

    public function update(Request $request, GameSession $session){
        $validated = $request->validate([
            'session_name' => 'required|string|max:255',
            'status' => 'required|string|in:active,inactive',
            'session_date' => 'required|date',
        ]);

        $session->update($validated);

        return redirect()->back()->with('success', 'Game session updated successfully.');
    }

    public function destroy(GameSession $session){
        $session->delete();

        return redirect()->route('sessions.index')->with('success', 'Game session deleted successfully.');
    }
}
