<?php

namespace App\Jobs;

use App\Http\Resources\TagTreeResource;
use App\Http\Resources\ZoneResource;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class BuildTreeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $elements = [];
    private $parentId;

    /**
     * Create a new job instance.
     *
     * @param array $elements
     * @param int $parentId
     */
    public function __construct(array $elements, $parentId = 0)
    {
        //
        $this->elements = $elements;
        $this->parentId = $parentId;
    }

    /**
     * Execute the job.
     *
     * @return array
     */
    public function handle()
    {
        //
        $branch = [];

        foreach ($this->elements as $element) {
                if ($element['parent_id'] == $this->parentId) {
                    $children = BuildTreeJob::dispatchNow($this->elements, $element['id']);
                    if ($children) {
                        $element['children'] = $children;
                    }
                    $branch[] = $element;
                }
            }
            return $branch;
    }
}
