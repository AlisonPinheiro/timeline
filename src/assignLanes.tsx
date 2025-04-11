/**
 * Define a interface para os itens da timeline
 */
export interface TimelineItem {
    start: string | Date;
    end: string | Date;
    [key: string]: any; // permite outras propriedades
  }
  
  /**
   * Recebe um array de itens e os distribui em "lanes" com base nas datas de início e fim.
   * @returns um array de arrays de itens.
   */
  export function assignLanes(items: TimelineItem[]): TimelineItem[][] {
    const sortedItems = [...items].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  
    const lanes: TimelineItem[][] = [];
  
    function assignItemToLane(item: TimelineItem) {
      for (const lane of lanes) {
        const lastItem = lane[lane.length - 1];
        if (new Date(lastItem.end) < new Date(item.start)) {
          lane.push(item);
          return;
        }
      }
      lanes.push([item]);
    }
  
    for (const item of sortedItems) {
      assignItemToLane(item);
    }
  
    return lanes;
  }
  